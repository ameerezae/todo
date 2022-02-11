import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskActionsModel, TaskModel} from "../../../../shared/models/task.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as TasksActions from '../../shared/store/tasks.actions';

@Component({
  selector: 'app-tasks-base',
  template: '',
})
export class TasksBaseComponent implements OnInit, OnDestroy {

  tasks: TaskModel[];
  completedTasks: TaskModel[];
  allowedActionsForTasks: TaskActionsModel;
  tasksSubscription: Subscription;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.fetchTasks();
    this.listenForTasks();
  }

  listenForTasks() {
    this.tasksSubscription = this.store.select('tasks').subscribe(tasksState => {
      console.log(tasksState);
      this.tasks = tasksState.tasksOfList;
      this.completedTasks = tasksState.completedTasks;
    })
  }

  fetchTasks() {
    throw new Error("Not implemented here");
  }

  deleteSingleTask(task: TaskModel) {
    this.store.dispatch(new TasksActions.DeleteSingleTask(task))
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }


}
