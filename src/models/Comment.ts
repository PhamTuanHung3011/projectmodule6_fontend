import {Users} from "./Users";
import {DatePipe} from "@angular/common";

export class Comment{
  id!: number;
  content!: string;
  date_Comment!: Date;
  users!: Users;


  constructor(id: number, content: string, date_Comment: Date ) {
    this.id = id;
    this.content = content;
    this.date_Comment = date_Comment;
  }
}
