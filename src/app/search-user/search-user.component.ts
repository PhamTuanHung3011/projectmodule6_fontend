import { Component, OnInit } from '@angular/core';
import {FriendServiceService} from "../../service/friendService/friend-service.service";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  myfriend: any
  constructor(private myService: FriendServiceService) { }

  ngOnInit(): void {
  }

}
