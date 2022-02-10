import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {ListsService} from "../services/lists.service";
import * as ListsActions from './lists.actions';
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {SnackService} from "../../../../shared/services/snack.service";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class ListsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private listsService: ListsService,
    private snackService: SnackService,
    private dialog: MatDialog
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
          this.snackService.successMessage('Created Successfully');
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
          this.snackService.successMessage('Edited Successfully');
          this.store.dispatch(new ListsActions.FetchAllLists());
        }
      )))
  )

  @Effect({dispatch: false})
  deleteExistingList = this.actions$.pipe(
    ofType(ListsActions.DELETE_EXISTING_LIST),
    switchMap((action: ListsActions.DeleteExistingList) =>
      this.listsService.deleteExistingList(action.id).pipe(map(
        response => {
          this.snackService.successMessage('Deleted Successfully.')
          this.store.dispatch(new ListsActions.FetchAllLists())
        }
      )))
  )
}
