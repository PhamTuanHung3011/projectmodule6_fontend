import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {StatusPost} from "../../models/Enum";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  showPost: Post = new Post(0,"",StatusPost[StatusPost.EVERYONE],new Date(),0);

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/post');
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>("http://localhost:8080/post/" + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/post/${id}`);
  }

  create(post: Post): Observable<any> {
    return this.http.post('http://localhost:8080/post', post);
  }

  edit(post: Post): Observable<any> {
    return this.http.put('http://localhost:8080/post/' + post.id , post);
  }

  find(post: Post) {
    this.showPost = post;
  }
}
