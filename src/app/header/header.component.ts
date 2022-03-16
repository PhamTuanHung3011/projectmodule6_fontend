import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogin$: Observable<boolean> = new Observable<boolean>();

  constructor(private auth: AuthService) {
  }

  public ngOnInit(): void {
    this.isLogin$ = this.auth.islogin();
  }

  public logout(): void {
    this.auth.logout();
  }
}
