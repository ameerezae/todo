import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TaskActionsModel, TaskModel} from "../../../../shared/models/task.model";

@Component({
  selector: 'app-tasks-show',
  templateUrl: './tasks-show.component.html',
  styleUrls: ['./tasks-show.component.scss']
})
export class TasksShowComponent implements OnInit {

  @Input() tasks: TaskModel[];
  @Input() allowedActions: TaskActionsModel;
  @Output() delete = new EventEmitter();
  @Output() move = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(task: TaskModel) {
    this.delete.emit(task);
  }

  moveTaskToDailyList(task: TaskModel) {
    this.move.emit(task)
  }

}
