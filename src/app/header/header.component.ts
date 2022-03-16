import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Observable} from "rxjs";
import {FriendServiceService} from "../../service/friendService/friend-service.service";
import {Users} from "../../models/Users";
import {TokenService} from "../../service/auth/token.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/userService/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Iduser!:any;
  username:any;
  public isLogin$: Observable<boolean> = new Observable<boolean>();
  namesearch!:string;
  listUser!:Users[];
  user1!:Users;
  nameUser!:any;
  nameUser1!:any;
  constructor(private auth: AuthService,private myService: FriendServiceService, private router: Router,private userService:UserService) {
  }

  public ngOnInit(): void {
    this.isLogin$ = this.auth.islogin();
    this.Iduser = window.sessionStorage.getItem('Id_Key');
    this.nameUser1 = window.sessionStorage.getItem('Name_Key');
    console.log(this.nameUser)
    this.showUserById()
  }

  showUserById(){
    this.userService.findById(this.Iduser).subscribe(data =>{
      console.log(data)
      this.user1 = data;
      console.log(this.user1.name)
    })
  }
  public logout(): void {
    this.auth.logout();
  }

  public showUserSearch(namesearch: string) {
    this.myService.searchUser(namesearch).subscribe(data =>{
      console.log("Data===>",data)
      this.listUser = data;
    })

  }

}
