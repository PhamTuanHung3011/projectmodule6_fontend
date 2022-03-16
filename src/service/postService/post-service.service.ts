import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {StatusPost} from "../../models/Enum";
import {environment} from "../../environments/environment.prod";
import {Users} from "../../models/Users";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private FIND_ALL_POST = environment.API_LOCAL + '/post';

  constructor(private http: HttpClient) {
  }

  showPost!: Post;

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.FIND_ALL_POST);
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>(this.FIND_ALL_POST + "/" + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.FIND_ALL_POST + "/" + id);
  }

  create(post: Post, id: number, arrLinkImg: string): Observable<any> {
    post.users = {id: id};
    post.listImage = [{link: arrLinkImg}];
    console.log(post)
    return this.http.post(this.FIND_ALL_POST, post);
  }

  edit(post: Post): Observable<any> {
    return this.http.put(this.FIND_ALL_POST + post.id, post);
  }

  find(post: Post) {
    this.showPost = post;
  }
}
