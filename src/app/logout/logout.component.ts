import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/auth/token.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.tokenService.logOut();
  }

}
