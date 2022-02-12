import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";

@Component({
  selector: 'app-manage-list-base',
  template: '',
})
export class ManageListBaseComponent implements OnInit {

  manageListFormGroup: FormGroup
  title: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.manageListFormGroup = this.createFormBuilder();

  }

  handleSubmit(){
    if (!this.manageListFormGroup.invalid){
      this.submittingList()
    }
  }

  submittingList(){
    throw new Error('Not Implemented Here.')
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

}
