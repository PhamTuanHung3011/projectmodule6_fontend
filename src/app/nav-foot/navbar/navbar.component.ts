import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../service/auth/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // @ts-ignore
  name: string;
  checkLogin = true;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName()
    }
  }

}
