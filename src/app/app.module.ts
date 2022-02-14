
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
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StoreModule} from "@ngrx/store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

// for importing components
import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';
import { AppComponent } from './app.component';
import { ListsComponent } from './main/lists/components/lists/lists.component';
import {ListTasksComponent} from "./main/tasks/components/tasks/list-tasks.component";
import { TasksBaseComponent } from './main/tasks/components/tasks/tasks-base.component';
import { TasksShowComponent } from './main/tasks/components/tasks/tasks-show.component';
import { CompletedTasksComponent } from './main/tasks/components/tasks/completed-tasks.component';
import { ManageTaskBaseComponent } from './main/tasks/components/manage-task/manage-task-base.component';
import { CreateTaskComponent } from "./main/tasks/components/manage-task/create-task.component";
import { EditTaskComponent } from './main/tasks/components/manage-task/edit-task.component';
import { ManageListBaseComponent } from './main/lists/components/manage-list/manage-list-base.component';
import { CreateListComponent } from './main/lists/components/manage-list/create-list.component';
import { EditListComponent } from './main/lists/components/manage-list/edit-list.component';

// for importing etc.
import {TasksEffects} from "./main/tasks/shared/store/tasks.effects";
import {ListsEffects} from "./main/lists/shared/store/lists.effects";
import {AppReducer} from "./store/app.reducer";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    AppComponent,
    TodoLayoutComponent,
    ListsComponent,
    ListTasksComponent,
    TasksBaseComponent,
    TasksShowComponent,
    CompletedTasksComponent,
    ManageTaskBaseComponent,
    CreateTaskComponent,
    EditTaskComponent,
    ManageListBaseComponent,
    CreateListComponent,
    EditListComponent,
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
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
