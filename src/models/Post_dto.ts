import {Users} from "./Users";


export class Post_dto {
  id!: number;
  content!: string;
  status!: string;
  date_Post!: Date;
  count_Like!: number;
  users!: any;
 listImage!: string[];


  constructor(id: number, content: string, status: string, date_Post: Date, count_Like: number, listImage: string[]) {
    this.id = id;
    this.content = content;
    this.status = status;
    this.date_Post = date_Post;
    this.count_Like = count_Like;
    this.listImage = listImage;
  }
}
