import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {Comment} from "../../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private COMMENT = environment.API_LOCAL + '/comments';

  constructor(private http: HttpClient) {
  }

  findById(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(this.COMMENT + "/" + commentId);
  }

  delete(commentId: number): Observable<any> {
    return this.http.delete<any>(this.COMMENT + "/" + commentId);
  }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.COMMENT, comment);
  }

  edit(commentId: number ,comment: Comment): Observable<number> {
    return this.http.put<number>(this.COMMENT + commentId, comment);
  }

  findCommentByCommentId(postId: number, commentId: number): Observable<Comment> {
    return this.http.get<Comment>(this.COMMENT + "/" + postId + "/edit-comment" + "/" + commentId);
  }

  findAllCommentByPostId(postId : number) : Observable<any> {
    return  this.http.get<any> (this.COMMENT + "/" + postId)
  }

}
