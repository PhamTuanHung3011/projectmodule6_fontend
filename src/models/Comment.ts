import {Users} from "./Users";

export class Comment{
  id!: number;
  content!: string;
  date_Comment!: Date;
  users!: any;
  post!: any;


  constructor(id: number, content: string, date_Comment: Date ) {
    this.id = id;
    this.content = content;
    this.date_Comment = date_Comment;
  }
}
