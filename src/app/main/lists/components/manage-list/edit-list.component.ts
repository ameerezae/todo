import {Component, Inject, OnInit} from '@angular/core';
import {ManageListBaseComponent} from "./manage-list-base.component";
import {FormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ListModel} from "../../../../shared/models/list.model";
import * as ListsActions from "../../shared/store/lists.actions";

@Component({
  selector: 'app-edit-list',
  templateUrl: './manage-list-show.component.html',
  styleUrls: ['./manage-list-show.component.scss']
})
export class EditListComponent extends ManageListBaseComponent implements OnInit {

  override title = 'Edit List'
  editingListId: string;


  constructor(
    protected formBuilder: FormBuilder,
    protected store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, list: ListModel},
  ) {
    super(formBuilder, store)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setFormBuilderValuesForEdit();
    this.editingListId = this.data.list._id;
  }

  override submittingList() {
    this.store.dispatch(new ListsActions.EditExistingList(
      this.editingListId,
      this.manageListFormGroup.get('title').value,
      this.manageListFormGroup.get('date').value,
      this.manageListFormGroup.get('isMain').value
    ))
  }

  setFormBuilderValuesForEdit() {
    const editingList = this.data.list;
    this.manageListFormGroup.setValue({
      title: editingList.title,
      date: editingList.date,
      isMain: editingList.isMain
    })
  }

}
