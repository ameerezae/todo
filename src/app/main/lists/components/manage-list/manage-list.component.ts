import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../../../store/app.reducer";
import {Store} from "@ngrx/store";
import * as ListsActions from '../../shared/store/lists.actions';
import {ListModel} from "../../../../shared/models/list.model";

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  manageListFormGroup: FormGroup
  editingListId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, list: ListModel},
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.manageListFormGroup = this.createFormBuilder();
    if (this.data.list) {
      this.setFormBuilderValuesForEdit();
      this.editingListId = this.data.list._id;
    }
  }

  private createFormBuilder(): FormGroup {
    const validations = {
      'title': [null, Validators.compose(
        [Validators.required, Validators.minLength(3)])
      ],
      'date': [null, Validators.required],
      'isMain': false
    }
    return this.formBuilder.group(validations);
  }

  hasError(field: string, error: string) {
    return this.manageListFormGroup.controls[field].errors?
      this.manageListFormGroup.controls[field].errors[error]
      : false;
  }

  createNewList(){
    this.store.dispatch(new ListsActions.CreateNewList(
      this.manageListFormGroup.get('title').value,
      this.manageListFormGroup.get('date').value,
      this.manageListFormGroup.get('isMain').value
    ))
  }

  editExistingList() {
    this.store.dispatch(new ListsActions.EditExistingList(
      this.editingListId,
      this.manageListFormGroup.get('title').value,
      this.manageListFormGroup.get('date').value,
      this.manageListFormGroup.get('isMain').value
    ))
  }

  handleSubmit(){
    if (!this.manageListFormGroup.invalid){
      if (this.editingListId) {
        this.editExistingList();
      } else {
        this.createNewList();
      }
    }
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
