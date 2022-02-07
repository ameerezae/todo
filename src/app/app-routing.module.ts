import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoLayoutComponent} from "./layouts/todo-layout/todo-layout.component";

const routes: Routes = [
  {
    path: '',
    component: TodoLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
