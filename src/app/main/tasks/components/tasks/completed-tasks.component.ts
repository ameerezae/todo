import { Component, OnInit } from '@angular/core';
import {TasksBaseComponent} from "./tasks-base.component";
import {TaskActionsModel} from "../../../../shared/models/task.model";
import * as TasksActions from '../../shared/store/tasks.actions'

@Component({
  selector: 'app-completed-tasks',
  template: `<app-tasks-show [tasks]="completedTasks"
                             [isFetched]="isFetched"
                             (delete)="deleteSingleTask($event)"
                             (create)="openManageTask()"
                             title="Completed Tasks"
                             [allowedActions]="allowedActionsForTasks"></app-tasks-show>`,
})
export class CompletedTasksComponent extends TasksBaseComponent implements OnInit {

  override fetchTasks() {
    this.store.dispatch(new TasksActions.FetchCompletedTasks());
  }

  override chooseAllowedActionsForTasks() {
    this.allowedActionsForTasks =
      new TaskActionsModel(false, true, false, false);
  }
}
