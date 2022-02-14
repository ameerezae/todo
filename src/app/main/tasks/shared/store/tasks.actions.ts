import { Action } from "@ngrx/store";
import {TaskModel} from "../../../../shared/models/task.model";

export const FETCH_TASKS_OF_LIST = '[Tasks] Fetch tasks of a list';
export const SET_TASKS_OF_LIST = '[Tasks] Set tasks of a list';
export const SET_FETCHING_TASKS_STATUS = '[Tasks] Set fetching Tasks status';
export const FETCH_COMPLETED_TASKS = '[Tasks] Fetch completed tasks';
export const SET_COMPLETED_TASKS = '[Tasks] Set completed tasks';
export const DELETE_SINGLE_TASK = '[Tasks] Delete single tasks';
export const UPDATE_SINGLE_TASK = '[Tasks] Update single task';
export const CLEAR_TASKS = '[Tasks] Clear tasks';
export const CREATE_NEW_TASK = '[Tasks] Create new task';

export class FetchTasksOfList implements Action{
  readonly type = FETCH_TASKS_OF_LIST;

  constructor(public ListID: string) {
  }
}

export class SetTasksOfList implements Action{
  readonly type = SET_TASKS_OF_LIST;

  constructor(public tasks: TaskModel[]) {
  }
}

export class FetchCompletedTasks implements Action{
  readonly type = FETCH_COMPLETED_TASKS;
}

export class SetCompletedTasks implements Action{
  readonly type = SET_COMPLETED_TASKS;
  constructor(public tasks: TaskModel[]) {
  }
}

export class DeleteSingleTask implements Action{
  readonly type = DELETE_SINGLE_TASK;

  constructor(public task: TaskModel) {
  }
}

export class UpdateSingleTask implements Action{
  readonly type = UPDATE_SINGLE_TASK;

  constructor(public task: TaskModel, public updatingData: any) {
  }
}

export class ClearTasks implements Action {
  readonly type = CLEAR_TASKS;
}

export class SetFetchingTaskStatus implements Action{
  readonly type = SET_FETCHING_TASKS_STATUS;
  constructor(public status: boolean) {
  }
}

export class CreateNewTask implements Action{
  readonly type = CREATE_NEW_TASK;

  constructor(public title: string,
              public description: string,
              public date: string,
              public list: string) {
  }
}

export type TasksActions =
  | SetTasksOfList
  | SetCompletedTasks
  | ClearTasks
  | SetFetchingTaskStatus
