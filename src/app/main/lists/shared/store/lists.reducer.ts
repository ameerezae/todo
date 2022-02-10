import {ListModel} from "../../../../shared/models/list.model";
import * as ListsActions from './lists.actions'

export interface ListsState {
  lists: ListModel[]
}

const initialState: ListsState = {
  lists : []
}

export function ListsReducer(
  state: ListsState = initialState,
  action: ListsActions.ListsActions
) {
  switch (action.type) {
    case ListsActions.SET_ALL_LISTS : {
      return {
        ...state,
        lists: action.lists
      }
    }
  }
}
