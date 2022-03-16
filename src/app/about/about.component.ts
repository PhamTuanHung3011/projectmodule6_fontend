import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/auth/token.service";
import {AuthService} from "../../service/auth/auth.service";
import {Users} from "../../models/Users";
import {UserService} from "../../service/userService/user.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
username:any;
constructor(private authService: AuthService,private tokenService: TokenService,private userService:UserService) { }
Iduser!:any;
user!:Users;
  ngOnInit(): void {
  this.Iduser = window.sessionStorage.getItem('Id_Key');
  this.showUserById()
  }

  showUserById(){
  this.userService.findById(this.Iduser).subscribe(data =>{
    console.log(data)
    this.user = data;
  })
  }

}
