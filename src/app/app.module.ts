
// for importing modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { EffectsModule } from "@ngrx/effects";


// for importing components
import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';
import { AppComponent } from './app.component';
import { ListsComponent } from './main/lists/components/lists/lists.component';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ManageListComponent } from './main/lists/components/manage-list/manage-list.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ListsEffects} from "./main/lists/shared/store/lists.effects";
import {StoreModule} from "@ngrx/store";
import {AppReducer} from "./store/app.reducer";
import { TasksComponent } from './main/tasks/components/tasks/tasks.component';
import {TasksEffects} from "./main/tasks/shared/store/tasks.effects";
import { TasksBaseComponent } from './main/tasks/components/tasks-base/tasks-base.component';
import { TasksShowComponent } from './main/tasks/components/tasks-show/tasks-show.component';
import { CompletedTasksComponent } from './main/tasks/components/completed-tasks/completed-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoLayoutComponent,
    ListsComponent,
    ManageListComponent,
    TasksComponent,
    TasksBaseComponent,
    TasksShowComponent,
    CompletedTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    EffectsModule.forRoot([ListsEffects, TasksEffects]),
    StoreModule.forRoot(AppReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
