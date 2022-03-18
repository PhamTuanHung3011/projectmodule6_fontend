import {Users} from "./Users";
import {DatePipe} from "@angular/common";

export class Post{
  id!: number;
  content!: string;
  isPublic!: boolean;
  status!: string;
  time!: Date;
  users!: any;
  comment!: Comment;
  image!: any;


  constructor(content: string, users: any, image: any,status: string) {
    this.content = content;
    this.users = users;
    this.image = image;
    this.status= status;
  }
}
