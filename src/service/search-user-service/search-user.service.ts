import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {StatusPost} from "../../models/Enum";
import {Observable} from "rxjs";
import {Users} from "../../models/Users";

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  constructor(private http:HttpClient) { }

  showUsers!: Users[];

  findUser(name:string):Observable<Users[]>{
    return this.http.get<Users[]>('this.http://localhost:8080/user/search/'+ name)
  }


}
