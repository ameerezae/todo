import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoLayoutComponent} from "./layouts/todo-layout/todo-layout.component";
import {TasksComponent} from "./main/tasks/components/tasks/tasks.component";
import {CompletedTasksComponent} from "./main/tasks/components/completed-tasks/completed-tasks.component";

const routes: Routes = [
  {
    path: '',
    component: TodoLayoutComponent,
    children: [
      {
        path: 'lists/:id',
        component: TasksComponent
      },
      {
        path: 'completed',
        component: CompletedTasksComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
