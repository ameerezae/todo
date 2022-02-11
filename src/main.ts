import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {AppSettings} from "./app/app.settings";

if (environment.production) {
  enableProdMode();
}

fetch('./assets/configs/configs.json').then(res => res.json()).then(confs => {

  AppSettings.ApiUrl = confs.apiUrl;

  AppSettings.AllListsUrl = AppSettings.ApiUrl + confs.allListsUrl;
  AppSettings.AllTasksUrl = AppSettings.ApiUrl + confs.allTasksUrl;
  AppSettings.TasksOfList = AppSettings.AllTasksUrl + confs.queryOnTasks;
  AppSettings.CompletedTasksUrl = AppSettings.ApiUrl + confs.completedTasksUrl;

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
})

