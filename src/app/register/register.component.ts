import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth/auth.service';
import {SignUpForm} from "../model/SignUpForm";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isPasswordCheck = true;
  public passwordCheck:any;


  form: any = {};
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  hide=true;


  // @ts-ignore
  signUpForm: SignUpForm;

  isCheckSuccess = false;
  status = 'Please fill in the form to register';
  error1: any = {
    message: "no_user"
  }
  error2: any = {
    message: "no_email"
  }
  success: any = {
    message: "yes"
  }

  constructor( private authService: AuthService,private router: Router) {
  }

  ngOnInit(): void {
  }

  checkPass(){
    if(this.form.password===this.passwordCheck){
      this.isPasswordCheck = false;
    }
  }

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
    console.log('signUpForm === ', this.signUpForm)
    this.authService.signUp(this.signUpForm).subscribe(data => {
      console.log('data == ', data)
      if (JSON.stringify(data) == JSON.stringify(this.error1)) {
        this.status = 'The username is existed! Please try again!'
      }
      if (JSON.stringify(data) == JSON.stringify(this.error2)) {
        this.status = 'The email is existed! Please try again!'
      }

      if (JSON.stringify(data) == JSON.stringify(this.success)) {
        console.log("data");
        console.log(data);
        this.isCheckSuccess = true;
        this.authService.setData(true);
        this.router.navigate(['']);
      }
    })
  }
}
