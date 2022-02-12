import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {TasksApiService} from "../services/tasks-api.service";
import {SnackService} from "../../../../shared/services/snack.service";
import {MatDialog} from "@angular/material/dialog";
import * as TasksActions from './tasks.actions';
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {TaskModel} from "../../../../shared/models/task.model";

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private tasksApiService: TasksApiService,
    private snackService: SnackService,
    private dialog: MatDialog
  ) {
  }

  @Effect()
  fetchCompletedTasks = this.actions$.pipe(
    ofType(TasksActions.FETCH_COMPLETED_TASKS),
    switchMap((action: TasksActions.FetchCompletedTasks) =>
      this.tasksApiService.getCompletedTasks().pipe(map(tasks => {
        return new TasksActions.SetCompletedTasks(this.mapIntoTaskModel(tasks))
      })))
  )

  @Effect()
  fetchTasksOfList = this.actions$.pipe(
    ofType(TasksActions.FETCH_TASKS_OF_LIST),
    switchMap((action: TasksActions.FetchTasksOfList) =>
      this.tasksApiService.getTasksOfList(action.ListID).pipe(map((tasks) => {
        return new TasksActions.SetTasksOfList(this.mapIntoTaskModel(tasks))
      })))
  )

  private mapIntoTaskModel(tasks: any) {
    return tasks.map((task: any) => {
      return new TaskModel(
        task.title,
        task.description,
        task.date,
        task.done,
        task.list,
        task._id
      );
    })
  }

  @Effect({dispatch: false})
  deleteSingleTask = this.actions$.pipe(
    ofType(TasksActions.DELETE_SINGLE_TASK),
    switchMap((action: TasksActions.DeleteSingleTask) =>
      this.tasksApiService.deleteSingleTask(action.task.id).pipe(map(response => {
        this.snackService.successMessage('Task Deleted Successfully.');
        this.store.dispatch(new TasksActions.FetchTasksOfList(action.task.list));
          this.store.dispatch(new TasksActions.FetchCompletedTasks());
        }
      )))
  )

  @Effect({dispatch: false})
  updateSingleTask = this.actions$.pipe(
    ofType(TasksActions.UPDATE_SINGLE_TASK),
    switchMap((action: TasksActions.UpdateSingleTask) =>
      this.tasksApiService.updateSingleTask(action.task.id, action.updatingData)
        .pipe(map(response => {
          this.snackService.successMessage('Task Updated Successfully.')
          const activeList = window.location.href.split('/').pop()
          if (activeList == 'completed'){
            this.store.dispatch(new TasksActions.FetchCompletedTasks());
          }
          this.store.dispatch(new TasksActions.FetchTasksOfList(action.task.list));
          this.dialog.closeAll();
        })))
  )

  @Effect({dispatch: false})
  createNewTask = this.actions$.pipe(
    ofType(TasksActions.CREATE_NEW_TASK),
    switchMap((action: TasksActions.CreateNewTask) =>
    this.tasksApiService.createNewTask(action.title,
      action.description,
      action.date,
      action.list)
      .pipe(map(response => {
        this.snackService.successMessage('Task Created Successfully.');
        const activeList = window.location.href.split('/').pop()
        if (activeList == action.list){
          this.store.dispatch(new TasksActions.FetchTasksOfList(action.list));
        }
        this.dialog.closeAll();
      })))
  )

}
