import {Component, Inject, OnInit} from '@angular/core';
import {ManageTaskBaseComponent} from "./manage-task-base.component";
import {FormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskModel} from "../../../../shared/models/task.model";
import * as TasksActions from '../../shared/store/tasks.actions';

@Component({
  selector: 'app-edit-task',
  templateUrl: './manage-task-show.component.html',
  styleUrls: ['./manage-task-show.component.scss']
})
export class EditTaskComponent extends ManageTaskBaseComponent implements OnInit {

  override title = 'Edit Task';

  constructor(
    protected formBuilder: FormBuilder,
    protected store: Store<AppState>,
    protected activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {task: TaskModel},
  ) {
    super(formBuilder, store, activatedRoute);
  }


  override submittingTask() {
    this.store.dispatch(new TasksActions.UpdateSingleTask(this.data.task, {
      title: this.manageTaskFormGroup.get('title').value,
      description: this.manageTaskFormGroup.get('description').value,
      date: this.manageTaskFormGroup.get('date').value,
      list: this.manageTaskFormGroup.get('list').value,
    }))

  }

  override ngOnInit() {
    super.ngOnInit();
    this.setFormBuilderValuesForEdit();
  }

  private setFormBuilderValuesForEdit() {
    const editingTask = this.data.task;
    this.manageTaskFormGroup.setValue({
      title: editingTask.title,
      description: editingTask.description,
      list: editingTask.list,
      date: editingTask.date,
    })
  }
}
