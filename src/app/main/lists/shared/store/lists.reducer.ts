import {ListModel} from "../../../../shared/models/list.model";
import * as ListsActions from './lists.actions'

export interface ListsState {
  lists: ListModel[]
  mainListID: string
}

const initialState: ListsState = {
  lists : [],
  mainListID: '',
}

export function ListsReducer(
  state: ListsState = initialState,
  action: ListsActions.ListsActions
) {
  switch (action.type) {
    case ListsActions.SET_ALL_LISTS : {
      return {
        ...state,
        lists: action.lists,
        mainListID: action.lists.filter(list => list.isMain == true)[0]._id
      }
    }
    default:{
      return {
        ...state
      }
    }
  }
}
