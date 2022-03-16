import {Users} from "./Users";


export class Post_dto {
  id!: number;
  content!: string;
  status!: string;
  date_Post!: Date;
  count_Like!: number;
  users!: Users;
 listImage!: string[];



}
