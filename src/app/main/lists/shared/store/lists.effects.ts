import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {ListsService} from "../services/lists.service";
import * as ListsActions from './lists.actions';
import {of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {SnackService} from "../../../../shared/services/snack.service";
import {MatDialog} from "@angular/material/dialog";
import {TasksApiService} from "../../../tasks/shared/services/tasks-api.service";
import {Router} from "@angular/router";

@Injectable()
export class ListsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private listsService: ListsService,
    private tasksApiService: TasksApiService,
    private snackService: SnackService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  @Effect()
  fetchAllLists = this.actions$.pipe(
    ofType(ListsActions.FETCH_ALL_LISTS),
    switchMap(() => this.listsService.getAllLists().pipe(map(lists => {
      return new ListsActions.SetAllLists(lists)
    })))
  )

  @Effect({dispatch: false})
  createNewList = this.actions$.pipe(
    ofType(ListsActions.CREATE_NEW_LIST),
    switchMap((action: ListsActions.CreateNewList) =>
      this.listsService.createNewList(action.title, action.date, action.isMain).pipe(map(
        response => {
          this.dialog.closeAll();
          this.snackService.successMessage('List Created Successfully');
          this.store.dispatch(new ListsActions.FetchAllLists());
        })
      ))
  )

  @Effect({dispatch: false})
  editExistingList = this.actions$.pipe(
    ofType(ListsActions.EDIT_EXISTING_LIST),
    switchMap((action: ListsActions.EditExistingList) =>
      this.listsService.editExistingList(action.id, action.title, action.date, action.isMain).pipe(map(
        response => {
          this.dialog.closeAll();
          this.snackService.successMessage('List Edited Successfully');
          this.store.dispatch(new ListsActions.FetchAllLists());
        }
      )))
  )

  @Effect({dispatch: false})
  deleteExistingList = this.actions$.pipe(
    ofType(ListsActions.DELETE_EXISTING_LIST),
    switchMap((action: ListsActions.DeleteExistingList) =>
      this.tasksApiService.getTasksOfList(action.id).pipe(map((tasks: any) => {
        if (tasks.length > 0) {  // Not Deleting list when it has tasks.
          this.snackService.errorMessage('List has Tasks, First Delete them.')
        } else {
          this.listsService.deleteExistingList(action.id).subscribe(() => {
            this.snackService.successMessage('List Deleted Successfully.');
            const activeList = window.location.href.split('/').pop()
            if (activeList == action.id) {  // navigate to main list
              this.router.navigate([`lists/main`])
            }
            this.store.dispatch(new ListsActions.FetchAllLists())
          })
        }
      }))
    )
  )


  @Effect({dispatch: false})
  checkForMainAndFetchList = this.actions$.pipe(
    ofType(ListsActions.CHECK_FOR_MAIN_AND_FETCH_LIST),
    switchMap(() => this.listsService.getMainLists().pipe(map((response: any) => {
      if (response) {
        this.store.dispatch(new ListsActions.FetchAllLists())
      }
    })))
  )
}
