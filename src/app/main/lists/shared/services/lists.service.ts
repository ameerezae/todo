import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListModel} from "../../../../shared/models/list.model";
import {AppSettings} from "../../../../app.settings";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private allListsUrl = AppSettings.AllListsUrl;

  constructor(private http: HttpClient) {
  }

  getAllLists() {
    return this.http.get(this.allListsUrl)
      .pipe(map((res) => this.mapIntoListModel(res)))
  }

  private mapIntoListModel(lists: any) {
    return lists.map((list: any) => new ListModel(list))
  }

  createNewList(title: string, date: string, isMain: boolean) {
    const newList = new ListModel(
      {
        title: title,
        date: date,
        isMain: isMain,
      }
    )
    return this.http.post(this.allListsUrl, newList)
  }

  editExistingList(id: string, title: string, date: string, isMain: boolean) {
    const editedList = {
        title: title,
        date: date,
        isMain: isMain,
      }

    return this.http.put(this.allListsUrl + `/${id}`, editedList)
  }

  deleteExistingList(id: string) {
    return this.http.delete(this.allListsUrl + `/${id}`)
  }
}
