import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment.prod";
import {Post_dto} from "../../models/Post_dto";
import {Comment} from "../../models/Comment";


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private FIND_ALL_POST = environment.API_LOCAL + '/post';

  constructor(private http: HttpClient) {
  }

  showPost!: Post;

  findAll(): Observable<Post_dto[]> {
    return this.http.get<Post_dto[]>(this.FIND_ALL_POST);
  }

  //show bai post len tuong
  findAllPostByUserCurrent( id: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.FIND_ALL_POST+ "/findAllByUserId/"+ id);
  }

  findById(id: number): Observable<Post_dto> {
    return this.http.get<Post_dto>(this.FIND_ALL_POST + "/" + id);
  }
  findPostById(id: number):Observable<Post> {
    return this.http.get<Post>(this.FIND_ALL_POST + "/findPost/" + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.FIND_ALL_POST + "/" + id);
  }

  create(post: Post): Observable<any> {
    console.log(post)
    return this.http.post(this.FIND_ALL_POST+ '/' + 'create', post);
  }

  edit(post: Post, id: number): Observable<any> {

    return this.http.put<any>(this.FIND_ALL_POST+ '/'+ id + '/edit', post);
  }

  getLikeNumber(): Observable<any> {
    return this.http.get<any>(this.FIND_ALL_POST);
  }

  createComment(comment: Comment, id: number) : Observable<any> {
    return  this.http.post<any>(this.FIND_ALL_POST+ "/" + id + "/createComment", comment);
  }

  findAllComment() : Observable<Comment[]> {
    return this.http.get<Comment[]>(this.FIND_ALL_POST + "/comments");
  }

  deleteComment(id: number) : Observable<void> {
    return this.http.delete<void>(this.FIND_ALL_POST + "/" + id + "/deleteComment")
  }

  // editComment(comment: Comment, id: number) : Observable<any> {
  //   return this.http.put<any>(this.FIND_ALL_POST + "/" + id + "editComment" , comment)
  // }

  // findCommentById(id: number): Observable<Comment> {
  //   return this.http.get<Comment>(this.FIND_ALL_POST + "/" + id);
  // }


  find(post: Post) {
    this.showPost = post;
  }

}
