import { ActionReducerMap } from "@ngrx/store";
import * as fromLists from '../main/lists/shared/store/lists.reducer'

export interface AppState {
  lists: fromLists.ListsState
}

export const AppReducer: ActionReducerMap<AppState, any> = {
  lists: fromLists.ListsReducer,
}
