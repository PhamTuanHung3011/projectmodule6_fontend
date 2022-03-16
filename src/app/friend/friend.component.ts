import {Component, OnInit} from '@angular/core';
import {FriendServiceService} from "../../service/friendService/friend-service.service";
import {TokenService} from "../../service/auth/token.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  myfriend: any

  constructor(private myService: FriendServiceService, private friendService: FriendServiceService, private tokenService: TokenService) {
  }
  id:number = this.tokenService.getId();

  ngOnInit(): void {
    this.getAllFriend()
  }

  public  getAllFriend() {
    this.myService.showListFriend(this.id).subscribe(data => {
      console.log('data==>',data)
      this.myfriend = data;
    })
  }
}
