import { Component, OnInit } from '@angular/core';
import {TasksBaseComponent} from "../tasks-base/tasks-base.component";
import {TaskActionsModel} from "../../../../shared/models/task.model";
import * as TasksActions from '../../shared/store/tasks.actions'

@Component({
  selector: 'app-completed-tasks',
  template: `<app-tasks-show [tasks]="completedTasks"
                             (delete)="deleteSingleTask($event)"
                             [allowedActions]="allowedActionsForTasks"></app-tasks-show>`,
})
export class CompletedTasksComponent extends TasksBaseComponent implements OnInit {
  override allowedActionsForTasks = new TaskActionsModel(false, true, false);

  override fetchTasks() {
    this.store.dispatch(new TasksActions.FetchCompletedTasks());
  }

}
