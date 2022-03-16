import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";

import {Friend} from "../../models/Friend";

@Injectable({
  providedIn: 'root'
})
export class FriendServiceService {

  private FRIEND_AIP = environment.API_LOCAL + '/Friend';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.FRIEND_AIP)
  }
  getById(id : number):Observable<any>{
    return  this.http.get(this.FRIEND_AIP+'/'+id);
  }
  create(friendRequest: Friend):Observable<Friend>{
    return this.http.post<Friend>(this.FRIEND_AIP,friendRequest)
  }
  update(id: number,friendRequest : Friend) :Observable<any>{
    return this.http.put<any>(this.FRIEND_AIP+'/'+id,friendRequest)
  }
  delete(id : number):Observable<any>{
    return  this.http.delete(this.FRIEND_AIP+'/'+id);
  }
  showListFriend(id:number):Observable<any>{
    return this.http.get(this.FRIEND_AIP+'/addedFriend/'+window.sessionStorage.getItem('Id_Key'))
  }
  searchUser(name:string):Observable<any>{
    return this.http.get(this.FRIEND_AIP+'/search_friend/'+name)
  }
}
