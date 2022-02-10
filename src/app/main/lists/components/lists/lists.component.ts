import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListsService} from "../../shared/services/lists.service";
import {ListModel} from "../../../../shared/models/list.model";
import {MatDialog} from "@angular/material/dialog";
import {ManageListComponent} from "../manage-list/manage-list.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as ListsActions from '../../shared/store/lists.actions';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {

  listsSubscription: Subscription;
  lists: ListModel[] = []

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ListsActions.FetchAllLists())
    this.listenToListsState();
  }

  ngOnDestroy() {
    this.listsSubscription.unsubscribe();
  }

  listenToListsState(){
    this.listsSubscription = this.store.select('lists').subscribe(listsState => {
      this.lists = listsState?.lists
    })
  }

  openManageList(title: string, list: ListModel = null){
    const createListDialogRef = this.dialog.open(ManageListComponent, {
      width: '450px',
      height: 'auto',
      autoFocus: false,
      data: {
        title: title,
        list: list
      }
    })
  }

  deleteSingleList(id: string) {
    this.store.dispatch(new ListsActions.DeleteExistingList(id));
  }

  editSingleList(event: Event, list: ListModel) {
    event.stopPropagation();
    this.openManageList('Edit List', list)
  }

}
