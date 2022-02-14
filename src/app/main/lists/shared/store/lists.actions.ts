import { Action } from "@ngrx/store";
import {ListModel} from "../../../../shared/models/list.model";

export const FETCH_ALL_LISTS = '[Lists] Fetch all lists';
export const SET_ALL_LISTS = '[Lists] Set all lists';
export const CREATE_NEW_LIST = '[Lists] Create new List'
export const EDIT_EXISTING_LIST = '[Lists] Edit existing list';
export const DELETE_EXISTING_LIST = '[Lists] Delete existing list';
export const CHECK_FOR_MAIN_AND_FETCH_LIST = '[Lists] Check for main and fetch';

export class FetchAllLists implements Action{
  readonly type = FETCH_ALL_LISTS;
}

export class SetAllLists implements Action {
  readonly type = SET_ALL_LISTS;
  constructor(public lists: ListModel[]) {
  }
}

export class CreateNewList implements Action {
  readonly type = CREATE_NEW_LIST;
  constructor(public title: string,
              public date: string,
              public isMain: boolean) {
  }
}

export class EditExistingList implements Action{
  readonly type = EDIT_EXISTING_LIST;
  constructor(public id: string,
              public title: string,
              public date: string,
              public isMain: boolean) {
  }
}

export class DeleteExistingList implements Action{
  readonly type = DELETE_EXISTING_LIST;
  constructor(public id: string) {
  }
}


export class CheckForMainAndFetchList implements Action{
  readonly type = CHECK_FOR_MAIN_AND_FETCH_LIST;
}

export type ListsActions =
  | SetAllLists
