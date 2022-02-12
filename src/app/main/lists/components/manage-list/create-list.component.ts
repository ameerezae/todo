import { Component, OnInit } from '@angular/core';
import {ManageListBaseComponent} from "./manage-list-base.component";
import * as ListsActions from "../../shared/store/lists.actions";

@Component({
  selector: 'app-create-list',
  templateUrl: './manage-list-show.component.html',
  styleUrls: ['./manage-list-show.component.scss']
})
export class CreateListComponent extends ManageListBaseComponent {

  override title = 'Create New List';

  override submittingList() {
    this.store.dispatch(new ListsActions.CreateNewList(
      this.manageListFormGroup.get('title').value,
      this.manageListFormGroup.get('date').value,
      this.manageListFormGroup.get('isMain').value
    ))
  }
}
