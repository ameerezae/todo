import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {ListModel} from "../../../../shared/models/list.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-task-base',
  template: '',
})
export class ManageTaskBaseComponent implements OnInit, OnDestroy {

  title: string;
  manageTaskFormGroup: FormGroup
  lists: ListModel[];
  listsSubscription: Subscription;

  constructor(
    protected formBuilder: FormBuilder,
    protected store: Store<AppState>,
    protected activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.manageTaskFormGroup = this.createFormBuilder();
    this.listenForLists();
  }

  private createFormBuilder(): FormGroup {
    const validations = {
      'title': [null, Validators.compose(
        [Validators.required, Validators.minLength(3)])],
      'description': [null, Validators.compose(
        [Validators.required, Validators.minLength(5)])],
      'date': [new Date(), Validators.required],
      'list': [null, Validators.required]
    }
    return this.formBuilder.group(validations)
  }

  hasError(field: string, error: string) {
    return this.manageTaskFormGroup.controls[field].errors?
      this.manageTaskFormGroup.controls[field].errors[error]
      : false;
  }

  handleSubmit(){
    if (!this.manageTaskFormGroup.invalid) {
      this.submittingTask();
    }
  }

  submittingTask() {
    throw new Error("Not implemented here!");
  }

  listenForLists() {
    this.listsSubscription = this.store.select("lists").subscribe(listsState => {
      this.lists = listsState.lists;
    })
  }

  ngOnDestroy() {
    this.listsSubscription.unsubscribe();
  }

}
