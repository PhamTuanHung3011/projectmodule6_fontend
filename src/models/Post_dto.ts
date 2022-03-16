import {Users} from "./Users";
import {Image} from "./Image";


export class Post_dto {
  id!: number;
  content!: string;
  status!: string;
  date_Post!: Date;
  count_Like!: number;
  users!: Users;
  listImage!: Image[];


  constructor(id: number, content: string, status: string, date_Post: Date, count_Like: number, users: Users, listImage: Image[]) {
    this.id = id;
    this.content = content;
    this.status = status;
    this.date_Post = date_Post;
    this.count_Like = count_Like;
    this.users = users;
    this.listImage = listImage;
  }
}
