import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {BehaviorSubject, Observable} from "rxjs";

import {SignUpForm} from "../../app/model/SignUpForm";
import {JwtResponse} from "../../app/model/JwtResponse";
import {SignInForm} from "../../app/model/SignInForm";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public idFriend = -1;
  private API_SIGNUP = environment.API_LOCAL + '/signup';
  private API_SIGNIN = environment.API_LOCAL + '/signin';
  private Login:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
// @ts-ignore
  data: boolean;
  constructor(private http: HttpClient,private router:Router) { }

  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP, signUp)
  }


  // @ts-ignore
  singIn(signUp: SignInForm): Observable<JwtResponse>{
    // @ts-ignore
    return  this.http.post<JwtResponse>(this.API_SIGNIN, signUp);
  }
  // @ts-ignore
  public login(signUp: SignInForm): Observable<JwtResponse> {
    // @ts-ignore
    if (signUp !== '') {
      this.Login.next(true);
    }
  }
  islogin():Observable<boolean>{
    let token = window.sessionStorage.getItem('Token_Key');
    if (token != null){
      this.Login.next(true);
    }else {
      this.Login.next(false);

    }
    return this.Login.asObservable();
  }

  logout():void{
    this.Login.next(false);
    window.sessionStorage.clear();
    this.router.navigate([""])

  }

  // @ts-ignore
  setData(data) {
    this.data = data;
  }

  getData(): boolean{
    return this.data;
  }

}
