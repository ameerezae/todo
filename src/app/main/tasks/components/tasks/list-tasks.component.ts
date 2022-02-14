import {Component, OnDestroy, OnInit} from '@angular/core';
import * as TasksActions from '../../shared/store/tasks.actions';
import {TaskActionsModel, TaskModel} from "../../../../shared/models/task.model";
import {Subscription} from "rxjs";
import {TasksBaseComponent} from "./tasks-base.component";

@Component({
  selector: 'app-list-tasks',
  template: `
    <app-tasks-show [tasks]="tasks"
                    [isFetched]="isFetched"
                    (delete)="deleteSingleTask($event)"
                    (move)="moveTaskToDailyList($event)"
                    (create)="openManageTask()"
                    (edit)="openManageTask($event)"
                    (complete)="completeSingleTask($event)"
                    [title]="currentListTitle"
                    [allowedActions]="allowedActionsForTasks"></app-tasks-show>`,
})
export class ListTasksComponent extends TasksBaseComponent implements OnInit, OnDestroy {

  mainListID: string;
  currentListID: string;
  currentListTitle: string;
  listsSubscription: Subscription;

  override fetchTasks() {
    this.activatedRoute.params.subscribe(param => {
      this.currentListID = param['id'];
      this.store.dispatch(new TasksActions.ClearTasks());
      if (this.currentListID != 'main'){
        this.getTasks();
      }
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

  override chooseAllowedActionsForTasks() {
    this.listsSubscription = this.store.select("lists").subscribe(listsState => {
      this.currentListTitle = listsState?.lists.find(list => {
        return list._id == this.currentListID
      })?.title
      this.mainListID = listsState?.mainListID;
      this.allowedActionsForTasks = this.currentListID == this.mainListID ?
        new TaskActionsModel(true, true, false, true) :
        new TaskActionsModel();
    })

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
