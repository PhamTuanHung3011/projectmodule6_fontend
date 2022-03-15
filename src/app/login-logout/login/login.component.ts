import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";
import {TokenService} from "../../../service/auth/token.service";
import {SignInForm} from "../../model/SignInForm";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide=true;
  form: any = {};
  // @ts-ignore
  signInForm: SignInForm;
  checkRegister = false;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getData()) {
      this.checkRegister = true;
    }

  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    )
    this.authService.singIn(this.signInForm).subscribe(data=>{
      if(data.token !=null) {
        this.tokenService.setId(data.id);
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRole(data.roles);
        this.router.navigate(['post']).then(() => {
          window.location.reload();
        })

      }
    })
  }

}
