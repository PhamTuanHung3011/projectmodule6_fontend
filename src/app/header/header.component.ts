import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Observable} from "rxjs";
import {FriendServiceService} from "../../service/friendService/friend-service.service";
import {Users} from "../../models/Users";
import {TokenService} from "../../service/auth/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/userService/user.service";
import {NotifiServiceService} from "../../service/notifiService/notifi-service.service";
import {Notifi} from "../../models/Notifi";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  check = true;
  Iduser!:any;
  username:any;
  public isLogin$: Observable<boolean> = new Observable<boolean>();
  namesearch!:string;
  listUser!:Users[];
  user1!:Users;
  nameUser!:any;
  nameUser1!:any;
  id:any;
  listNotif!:Notifi[];
  constructor( private activatedRoute:ActivatedRoute,private auth: AuthService,
               private friendService: FriendServiceService, private router: Router,
               private userService:UserService,private notif:NotifiServiceService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id']
    this.isLogin$ = this.auth.islogin();
    this.Iduser = window.sessionStorage.getItem('Id_Key');
    this.nameUser1 = window.sessionStorage.getItem('Name_Key');
    console.log(this.nameUser);
    this.showUserById();
  })
  }

  showUserById():void{
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
    this.friendService.searchUser(namesearch).subscribe(data =>{
      console.log("Data===>",data)
      this.listUser = data;
    })

  }
  showNotifUser(){

    this.notif.getNotif(this.Iduser).subscribe(data =>{
      console.log(this.Iduser)
      console.log(data)
      this.listNotif = data;
    })
  }

  okMyFriend(n: Notifi) {
    this.friendService.agreeMakeFriend(n.from.id,n.to.id,n).subscribe(
      data =>{
        console.log(this.Iduser)
        console.log(n)
        this.listNotif = data;
        alert("ket ban thanh cong")
      },
    (error:HttpErrorResponse) =>{
        alert(error);
    }
    )

  }

  deleteNotifi(n: Notifi) {
  this.friendService.deleteWaitFriend(n.from.id,n.to.id,n.id).subscribe(data =>{
    console.log(n)
    this.listNotif =data;
    alert("Successfully!")
  })
  }
}
