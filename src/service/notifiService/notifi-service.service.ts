import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotifiServiceService {

  private FRIEND_AIP = environment.API_LOCAL + '/Notif';

  constructor(private http: HttpClient) {
  }
  getNotif(id:number): Observable<any> {
    return this.http.get<any>(this.FRIEND_AIP+'/listNotifUser/'+id)
  }
}
