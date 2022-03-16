import {Users} from "./Users";

export interface Friend{
  id?: number;
  userSender?: Users;
  userReceiver?: Users;
  stt?: boolean
}
