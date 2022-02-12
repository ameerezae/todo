import { Component, OnInit } from '@angular/core';
import * as TasksActions from '../../shared/store/tasks.actions';
import {ManageTaskBaseComponent} from "./manage-task-base.component";

@Component({
  selector: 'app-create-task',
  templateUrl: './manage-task-show.component.html',
  styleUrls: ['./manage-task-show.component.scss']
})
export class CreateTaskComponent extends ManageTaskBaseComponent implements OnInit {

  override title = 'Create Task';

  override submittingTask() {
    this.store.dispatch(new TasksActions.CreateNewTask(
      this.manageTaskFormGroup.get('title').value,
      this.manageTaskFormGroup.get('description').value,
      this.manageTaskFormGroup.get('date').value,
      this.manageTaskFormGroup.get('list').value,
    ))
  }

}
