import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/auth/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name_user2!: string;
  checkLogin = true;


  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.name_user2 = window.sessionStorage.getItem('Name_Key')
  }
  logOut() {
    this.tokenService.logOut();
  }
}
