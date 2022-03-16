import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {StatusPost} from "../../models/Enum";
import {Observable} from "rxjs";
import {Image} from "../../models/Image";

@Injectable({
  providedIn: 'root'
})
export class ImgServiceService {

  constructor(private http: HttpClient) { }

  img: Image = new Image(0,"");

  findAll(): Observable<Image[]> {
    return this.http.get<Image[]>('http://localhost:8080/img');
  }

  findById(id: number): Observable<Image> {
    return this.http.get<Image>("http://localhost:8080/img/" + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/img/${id}`);
  }

  create(img: Image): Observable<any> {
    return this.http.post('http://localhost:8080/img', img);
  }

  edit(img: Image): Observable<any> {
    return this.http.put('http://localhost:8080/img/' + img.id , img);
  }
}
