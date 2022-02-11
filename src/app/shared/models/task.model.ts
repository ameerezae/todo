export class TaskModel {
  constructor(
    public title: string,
    public description: string,
    public date: string,
    public done: boolean,
    public list: string,
    public id: string,
  ) {
  }
}

export class TaskActionsModel {
  constructor(
    public editable: boolean = true,
    public deletable: boolean = true,
    public movable: boolean = true,
  ) {
  }
}
