import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TaskActionsModel, TaskModel} from "../../../../shared/models/task.model";

@Component({
  selector: 'app-tasks-show',
  templateUrl: './tasks-show.component.html',
  styleUrls: ['./tasks-show.component.scss']
})
export class TasksShowComponent implements OnInit {

  @Input() title: string
  @Input() tasks: TaskModel[];
  @Input() allowedActions: TaskActionsModel;
  @Input() isFetched: boolean;
  @Output() delete = new EventEmitter();
  @Output() move = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() complete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(task: TaskModel) {
    this.delete.emit(task);
  }

  moveTaskToDailyList(task: TaskModel) {
    this.move.emit(task)
  }

  createNewTask(){
    this.create.emit();
  }

  editExistingTask(task: TaskModel){
    this.edit.emit(task)
  }

  toggleCompleteTask(task: TaskModel, event: any){
    const completed = event.checked;
    this.complete.emit({task, completed})
  }
}
