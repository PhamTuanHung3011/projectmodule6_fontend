import {Component, OnInit} from '@angular/core';
import {FriendServiceService} from "../../service/friendService/friend-service.service";
import {TokenService} from "../../service/auth/token.service";
import {UserService} from "../../service/userService/user.service";
import {Users} from "../../models/Users";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  myfriend: any
  Iduser!:any;
  user!:Users;
  constructor(private userService:UserService,private myService: FriendServiceService, private friendService: FriendServiceService, private tokenService: TokenService) {
  }
  id:number = this.tokenService.getId();

  ngOnInit(): void {
    this.getAllFriend()
    this.Iduser = window.sessionStorage.getItem('Id_Key');
    this.showUserById()
  }
  showUserById(){
    this.userService.findById(this.Iduser).subscribe(data =>{
      console.log(data)
      this.user = data;
    })
  }
  public  getAllFriend() {
    this.myService.showListFriend(this.id).subscribe(data => {
      console.log('data==>',data)
      this.myfriend = data;
    })
  }
}
