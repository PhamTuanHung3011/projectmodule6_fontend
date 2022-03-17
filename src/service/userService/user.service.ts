import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../../models/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USER = environment.API_LOCAL + '/user';

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<Users> {
    return this.http.get<Users>(this.USER + "/showUserDetails/" + id);
  }

  edit(user: Users): Observable<any> {
    return this.http.put(this.USER + user.id, user);
  }

  getAll():Observable<any>{
    return this.http.get(this.USER+"/findAll");
  }
}
