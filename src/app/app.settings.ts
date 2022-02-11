import {Injectable} from "@angular/core";

@Injectable()
export class AppSettings {
  public static ApiUrl: string;

  public static AllListsUrl : string;
  public static AllTasksUrl: string;
  public static TasksOfList: string;
  public static CompletedTasksUrl: string;
}
