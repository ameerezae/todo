import {TaskModel} from "../../../../shared/models/task.model";
import * as TasksActions from './tasks.actions';

export interface TasksState {
  tasksOfList: TaskModel[],
  completedTasks: TaskModel[],
  isFetched: boolean,
}

const initialState: TasksState = {
  tasksOfList: [],
  completedTasks: [],
  isFetched: false,
}

export function TasksReducer(
  state: TasksState = initialState,
  action: TasksActions.TasksActions
) {
  switch (action.type) {
    case TasksActions.SET_TASKS_OF_LIST:{
      return{
        ...state,
        tasksOfList: action.tasks,
        isFetched: true,
      }
    }
    case TasksActions.SET_COMPLETED_TASKS: {
      return {
        ...state,
        completedTasks: action.tasks,
        isFetched: true,
      }
    }
    case TasksActions.CLEAR_TASKS: {
      return {
        ...state,
        tasksOfList: []
      }
    }
    case TasksActions.SET_FETCHING_TASKS_STATUS: {
      return {
        ...state,
        isFetched: action.status
      }
    }

    default:{
      return {
        ...state
      }
    }
  }
}
