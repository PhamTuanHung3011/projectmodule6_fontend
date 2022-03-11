import {Users} from "./Users";
import {StatusFriend} from "./Enum";


export class Friend {
  id!: number;
  status!: StatusFriend;
  users!: Users;


  constructor(id: number, status: StatusFriend, users: Users) {
    this.id = id;
    this.status = status;
    this.users = users;
  }
}
