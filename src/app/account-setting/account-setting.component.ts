// import { Component, OnInit } from '@angular/core';
// import {AuthService} from "../../service/auth/auth.service";
// import {TokenService} from "../../service/auth/token.service";
// import {UserService} from "../../service/userService/user.service";
// import {Users} from "../../models/Users";
// import {FormControl, FormGroup} from "@angular/forms";
//
// @Component({
//   selector: 'app-account-setting',
//   templateUrl: './account-setting.component.html',
//   styleUrls: ['./account-setting.component.css']
// })
// export class AccountSettingComponent implements OnInit {
//
//   username:any;
//   constructor(private authService: AuthService,private tokenService: TokenService,private userService:UserService) { }
//   Iduser!:any;
//   user!:Users;
//   // @ts-ignore
//   inforUser:Users;
//   // @ts-ignore
//   inforUsers:FormGroup;
//   ngOnInit(): void {
//     this.inforUsers = new FormGroup({
//       id:new FormControl(0),
//       name:new FormControl(''),
//       username:new FormControl(''),
//       email:new FormControl(''),
//       phone:new FormControl(''),
//       address:new FormControl(''),
//       password:new FormControl(''),
//       avatar:new FormControl(''),
//       birthday:new FormControl(''),
//       gender:new FormControl(''),
//
//     })
//     this.Iduser = window.sessionStorage.getItem('Id_Key');
//     this.showUserById();
//   }
//
//   showUserById(){
//     this.userService.findById(this.Iduser).subscribe(data =>{
//       console.log(data)
//       this.user = data;
//     })
//   }
//   editUser(user:Users){
//     console.log(user)
//     this.userService.edit(user).subscribe(data=>{
//       console.log(data)
//       console.log(user.id)
//       this.showUserById();
//     })
//   }
//
// }
