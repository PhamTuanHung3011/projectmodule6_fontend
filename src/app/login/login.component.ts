import { Component, OnInit } from '@angular/core';
import {SignInForm} from "../model/SignInForm";
import {AuthService} from "../../service/auth/auth.service";
import { TokenService } from 'src/service/auth/token.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      console.log("data")
      console.log(data)
      if(data.token !=null) {
        this.tokenService.setToken(data.token);
        console.log("data.id")
        console.log(data.id)
        this.tokenService.setId(data.id);
        // @ts-ignore
        this.tokenService.setUser(JSON.stringify(data.users));
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        })

      }
    })
  }

}
