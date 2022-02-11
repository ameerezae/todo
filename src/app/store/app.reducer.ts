import { ActionReducerMap } from "@ngrx/store";
import * as fromLists from '../main/lists/shared/store/lists.reducer'
import * as fromTasks from '../main/tasks/shared/store/tasks.reducer';

export interface AppState {
  lists: fromLists.ListsState,
  tasks: fromTasks.TasksState
}

export const AppReducer: ActionReducerMap<AppState, any> = {
  lists: fromLists.ListsReducer,
  tasks: fromTasks.TasksReducer
}
