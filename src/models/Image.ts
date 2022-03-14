import {Users} from "./Users";
import {Post} from "./Post";
import {Post_dto} from "./Post_dto";


export class Image {
  id!: number;
  link!: string;
  users!: Users;
  post!: Post_dto;


  constructor(id: number, link: string) {
    this.id = id;
    this.link = link;
  }
}
