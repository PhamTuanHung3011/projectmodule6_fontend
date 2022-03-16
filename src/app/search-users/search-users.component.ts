import {Component, OnInit} from '@angular/core';
import {SearchUserService} from "../../service/search-user-service/search-user.service";
import {Users} from "../../models/Users";

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  showUser: Users[] =[];

  constructor(private searchservice: SearchUserService) {
    this.showUser = this.searchservice.showUsers;
  }
  ngOnInit(): void {
  }



}
