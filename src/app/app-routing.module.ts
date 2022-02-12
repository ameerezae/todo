import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoLayoutComponent} from "./layouts/todo-layout/todo-layout.component";
import {CompletedTasksComponent} from "./main/tasks/components/tasks/completed-tasks.component";
import {ListTasksComponent} from "./main/tasks/components/tasks/list-tasks.component";

const routes: Routes = [
  {
    path: '',
    component: TodoLayoutComponent,
    children: [
      {
        path: 'lists/:id',
        component: ListTasksComponent
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
