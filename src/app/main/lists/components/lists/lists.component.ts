import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import {ListModel} from "../../../../shared/models/list.model";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as ListsActions from '../../shared/store/lists.actions';
import {Subscription} from "rxjs";
import {CreateListComponent} from "../manage-list/create-list.component";
import {EditListComponent} from "../manage-list/edit-list.component";
import {Router} from "@angular/router";

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
    private store: Store<AppState>,
    private location: Location,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ListsActions.FetchAllLists())
    this.listenToListsState();
  }

  ngOnDestroy() {
    this.listsSubscription.unsubscribe();
  }

  listenToListsState() {
    this.listsSubscription = this.store.select('lists').subscribe(listsState => {
      this.lists = listsState?.lists
      this.navigateToMainListForInvalidPath(listsState.mainListID)
    })
  }

  navigateToMainListForInvalidPath(mainListId: string){
    const activeList = window.location.href.split('/').pop()
    if (activeList == 'main' && mainListId){
      this.router.navigate([`lists/${mainListId}`])
    }
  }

  openManageList(list: ListModel = null) {
    const data = list != null ? {list} : null
    const createListDialogRef = this.dialog.open(
      list == null ? CreateListComponent : EditListComponent,
      {
        width: '450px',
        height: 'auto',
        autoFocus: false,
        data: data
      })
  }

  deleteSingleList(id: string) {
    this.store.dispatch(new ListsActions.DeleteExistingList(id));
  }

  editSingleList(event: Event, list: ListModel) {
    event.stopPropagation();
    this.openManageList(list)
  }

}
