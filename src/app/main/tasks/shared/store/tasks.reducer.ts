import {TaskModel} from "../../../../shared/models/task.model";
import * as TasksActions from './tasks.actions';

export interface TasksState {
  tasksOfList: TaskModel[],
  completedTasks: TaskModel[],
}

const initialState: TasksState = {
  tasksOfList: [],
  completedTasks: [],
}

export function TasksReducer(
  state: TasksState = initialState,
  action: TasksActions.TasksActions
) {
  switch (action.type) {
    case TasksActions.SET_TASKS_OF_LIST:{
      return{
        ...state,
        tasksOfList: action.tasks
      }
    }
    case TasksActions.SET_COMPLETED_TASKS: {
      return {
        ...state,
        completedTasks: action.tasks
      }
    }
    case TasksActions.CLEAR_TASKS: {
      return {
        ...state,
        tasksOfList: []
      }
    }
    default:{
      return {
        ...state
      }
    }
  }
}
