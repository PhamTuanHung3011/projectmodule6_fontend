import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/userService/user.service";
import {Observable} from "rxjs";
import {Users} from "../../models/Users";
import {Gender} from "../../models/Enum";
import {ActivatedRoute} from "@angular/router";
import {FriendServiceService} from "../../service/friendService/friend-service.service";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  id!: number;
  user!: Users;
 idMyAcc!:any;
  constructor(private userService: UserService,private friendService:FriendServiceService, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idMyAcc = window.sessionStorage.getItem('Id_Key');
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id']
      this.showDetailsUser();
    })
  }

  public showDetailsUser() {
    this.userService.findById(this.id).subscribe(data => {
      console.log("Data--->",data)
      this.user = data;
    })
  }

  getAll(idFriend: number) {
    this.friendService.showMutualFriend(this.idMyAcc, idFriend).subscribe(data => {
      this.user = data;
    })
  }
}
