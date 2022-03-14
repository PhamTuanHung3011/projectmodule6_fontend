import {Role} from "./Role";
import {Gender, RoleName} from "./Enum";

export class Users{
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  phone!: string;
  address!: string;
  gender!: string;
  password!: string;
  avatar!: string;
  role!: Role;
  birthday!: Date;
  roleName!: RoleName;


  constructor(id: number, name: string, username: string, email: string, phone: string, address: string, gender: Gender, password: string, avatar: string, role: Role, birthday: Date) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
    this.birthday = birthday;
  }
}
