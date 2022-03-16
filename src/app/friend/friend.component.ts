import {Component, OnInit} from '@angular/core';
import {FriendServiceService} from "../../service/friendService/friend-service.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  myfriend: any

  constructor(private myService: FriendServiceService, private friendService: FriendServiceService) {
  }

  ngOnInit(): void {
  }

  getAllFriend(id_user:number) {
    this.myService.showListFriend(id_user).subscribe(data => {
      this.myfriend = data;
    })
  }
}
