export class ListModel{
  title: string;
  date: string;
  isMain: boolean;
  _id: string = null;

  constructor(obj: any) {
    Object.assign(this, obj)
  }
}
