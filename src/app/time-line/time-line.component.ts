import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {TokenService} from "../../service/auth/token.service";
import {UserService} from "../../service/userService/user.service";
import {Users} from "../../models/Users";
import {ActivatedRoute} from "@angular/router";
import {FriendServiceService} from "../../service/friendService/friend-service.service";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {
id!:number;
  username:any;
  constructor(private activatedRoute:ActivatedRoute,private authService: AuthService,
              private tokenService: TokenService,private userService:UserService,
              private friendService:FriendServiceService) { }
  Iduser!:any;
  user!:Users;
  listUser!:Users[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id']
    this.Iduser = window.sessionStorage.getItem('Id_Key');
    this.findUserById();
  })
  }

  public findUserById():void {
    this.userService.findById(this.id).subscribe(data => {
      console.log("Data--->",data)
      this.user = data;
    })
  }

  // showUserById():void{
  //   this.userService.findById(this.Iduser).subscribe(data =>{
  //     console.log(data)
  //     this.user = data;
  //   })
  // }

  addFriend(ida:number):void{

    this.friendService.waitMakeFriend(this.Iduser,ida).subscribe(data=>{
      console.log(this.Iduser)
      console.log(ida)
    })
  }
}
