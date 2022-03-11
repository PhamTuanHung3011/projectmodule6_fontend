import {Users} from "./Users";
import {StatusFriend} from "./Enum";


export class Friend {
  id!: number;
  status!: StatusFriend;
  user!: Users;


  constructor(id: number, status: StatusFriend, user: Users) {
    this.id = id;
    this.status = status;
    this.user = user;
  }
}
