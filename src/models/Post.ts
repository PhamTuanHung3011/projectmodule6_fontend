import {Users} from "./Users";
import {DatePipe} from "@angular/common";

export class Post{
  id!: number;
  content!: string;
  isPublic!: boolean;
  time!: Date;
  users!: any;
  // comment!: Comment;
  image!: any;


  constructor(content: string, users: any, image: any) {
    this.content = content;
    this.users = users;
    this.image = image;
  }
}
