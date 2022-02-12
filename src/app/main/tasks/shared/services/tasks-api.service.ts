import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../../../app.settings";

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  private allTasksUrl: string = AppSettings.AllTasksUrl;
  private tasksOfListUrl: string = AppSettings.TasksOfList;
  private completedTasksUrl: string = AppSettings.CompletedTasksUrl;

  constructor(private http: HttpClient) { }

  getTasksOfList(ListID: string) {
    return this.http.get(this.tasksOfListUrl + ListID)
  }

  getCompletedTasks(){
    return this.http.get(this.completedTasksUrl)
  }

  deleteSingleTask(id: string){
    return this.http.delete(this.allTasksUrl + id)
  }

  updateSingleTask(id: string, updatingData: any){
    return this.http.put(this.allTasksUrl + id, updatingData)
  }

  createNewTask(title: string, description: string,
                date: string, list: string) {
    const newTask = {
      title: title,
      description: description,
      date: date,
      list: list,
      done: false
    }
    return this.http.post(this.allTasksUrl, newTask)
  }
}
