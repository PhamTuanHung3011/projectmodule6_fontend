import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {TokenService} from "../../service/auth/token.service";
import {UserService} from "../../service/userService/user.service";
import {Users} from "../../models/Users";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {
id!:number;
  username:any;
  constructor(private activatedRoute:ActivatedRoute,private authService: AuthService,private tokenService: TokenService,private userService:UserService) { }
  Iduser!:any;
  user!:Users;
  user2!:Users;
  listUser!:Users[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id']
    this.Iduser = window.sessionStorage.getItem('Id_Key');
    this.showUserById();this.findUserById();
  })
  }

  public findUserById() {
    this.userService.findById(this.id).subscribe(data => {
      console.log("Data--->",data)
      this.user2 = data;
    })
  }

  showUserById(){
    this.userService.findById(this.Iduser).subscribe(data =>{
      console.log(data)
      this.user = data;
    })
  }



}
