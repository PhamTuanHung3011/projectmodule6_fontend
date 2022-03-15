import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {Post} from "../../models/Post";
import {Users} from "../../models/Users";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendServiceService {

  private FRIEND_AIP = environment.API_LOCAL + '/Friend';

  constructor(private http: HttpClient) { }

  findFriendById(users: Users, id: number): Observable<any> {
    return this.http.get<Post>(this.FRIEND_AIP + "/" + id);
  }
}
