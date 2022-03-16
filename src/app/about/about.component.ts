import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/auth/token.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
username:any;
constructor(private authService: AuthService,private tokenService: TokenService) { }

  ngOnInit(): void {
  this.username = window.sessionStorage.getItem('Name_Key')
  }
}
