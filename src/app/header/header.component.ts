import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Observable} from "rxjs";
import {FriendServiceService} from "../../service/friendService/friend-service.service";
import {Users} from "../../models/Users";
import {TokenService} from "../../service/auth/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:any;
  public isLogin$: Observable<boolean> = new Observable<boolean>();
  namesearch!:string;
  listUser!:Users[];
  constructor(private auth: AuthService,private myService: FriendServiceService, private router: Router) {
  }

  public ngOnInit(): void {
    this.isLogin$ = this.auth.islogin();
    this.username = window.sessionStorage.getItem('Name_Key')
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
