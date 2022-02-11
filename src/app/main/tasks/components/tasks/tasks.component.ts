import {Component, OnDestroy, OnInit} from '@angular/core';
import * as TasksActions from '../../shared/store/tasks.actions';
import {TaskActionsModel, TaskModel} from "../../../../shared/models/task.model";
import {Subscription} from "rxjs";
import {TasksBaseComponent} from "../tasks-base/tasks-base.component";

@Component({
  selector: 'app-tasks',
  template: `
    <app-tasks-show [tasks]="tasks"
                    (delete)="deleteSingleTask($event)"
                    (move)="moveTaskToDailyList($event)"
                    [allowedActions]="allowedActionsForTasks"></app-tasks-show>`,
})
export class TasksComponent extends TasksBaseComponent implements OnInit, OnDestroy {

  mainListID: string;
  currentListID: string;
  listsSubscription: Subscription;


  override fetchTasks() {
    this.activatedRoute.params.subscribe(param => {
      this.currentListID = param['id'];
      this.chooseAllowedActionsForTasks();
      this.getTasks();
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.listsSubscription.unsubscribe()
  }

  getTasks() {
    this.store.dispatch(new TasksActions.FetchTasksOfList(
      this.currentListID
    ))
  }

  chooseAllowedActionsForTasks() {
    this.listsSubscription = this.store.select("lists").subscribe(listsState => {
      this.mainListID = listsState.mainListID;
    })
    this.allowedActionsForTasks = this.currentListID == this.mainListID ?
      new TaskActionsModel(true, true, false) :
      new TaskActionsModel();
  }

  moveTaskToDailyList(task: TaskModel) {
    this.store.dispatch(new TasksActions.UpdateSingleTask(
      task,
      {
        list: this.mainListID
      }
    ))
  }

}
