import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {StatusPost} from "../../models/Enum";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private FIND_ALL_POST = environment.API_LOCAL + '/post';
  constructor(private http: HttpClient) { }

  showPost: Post = new Post(0,"",StatusPost[StatusPost.EVERYONE],new Date(),0);

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.FIND_ALL_POST);
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>(this.FIND_ALL_POST + "/" + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.FIND_ALL_POST + "/" + id);
  }

  create(post: Post): Observable<any> {
    return this.http.post(this.FIND_ALL_POST, post);
  }

  edit(post: Post): Observable<any> {
    return this.http.put(this.FIND_ALL_POST + post.id , post);
  }

  find(post: Post) {
    this.showPost = post;
  }
}
