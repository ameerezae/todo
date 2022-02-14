import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskActionsModel, TaskModel} from "../../../../shared/models/task.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as TasksActions from '../../shared/store/tasks.actions';
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskComponent} from "../manage-task/create-task.component";
import {EditTaskComponent} from "../manage-task/edit-task.component";

@Component({
  selector: 'app-tasks-base',
  template: '',
})
export class TasksBaseComponent implements OnInit, OnDestroy {

  tasks: TaskModel[];
  completedTasks: TaskModel[];
  isFetched: boolean = false;
  allowedActionsForTasks: TaskActionsModel;
  tasksSubscription: Subscription;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AppState>,
    protected dialog: MatDialog,
    protected router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchTasks();
    this.listenForTasks();
    this.chooseAllowedActionsForTasks();
  }

  listenForTasks() {
    this.tasksSubscription = this.store.select('tasks').subscribe(tasksState => {
      this.tasks = tasksState.tasksOfList;
      this.completedTasks = tasksState.completedTasks;
      this.isFetched = tasksState.isFetched;
    })
  }

  fetchTasks() {
    throw new Error("Not implemented here");
  }

  deleteSingleTask(task: TaskModel) {
    this.store.dispatch(new TasksActions.DeleteSingleTask(task))
  }

  completeSingleTask(taskDetail: {task: TaskModel, completed: boolean}){
    this.store.dispatch(new TasksActions.UpdateSingleTask(taskDetail.task, {
      done: taskDetail.completed
    }))
  }

  openManageTask(task: TaskModel = null) {
    const data = task != null ? {task} : null
    const manageTaskDialogRef = this.dialog.open(
      task == null ? CreateTaskComponent : EditTaskComponent,
      {
      width: '450px',
      height: 'auto',
      autoFocus: false,
      data: data
    })
  }

  chooseAllowedActionsForTasks() {
    throw new Error('Not Implemented here');
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

}
