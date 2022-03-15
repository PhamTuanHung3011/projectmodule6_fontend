import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";

import {SignUpForm} from "../../app/model/SignUpForm";
import {JwtResponse} from "../../app/model/JwtResponse";
import {SignInForm} from "../../app/model/SignInForm";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_SIGNUP = environment.API_LOCAL + '/signup';
  private API_SIGNIN = environment.API_LOCAL + '/signin';
// @ts-ignore
  data: boolean;
  constructor(private http: HttpClient) { }

  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP, signUp)
  }


  singIn(signUp: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SIGNIN, signUp);
  }

  // @ts-ignore
  setData(data) {
    this.data = data;
  }

  getData(): boolean{
    return this.data;
  }

}
