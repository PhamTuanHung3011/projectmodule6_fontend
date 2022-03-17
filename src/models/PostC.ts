import {Post} from "./Post";

export class PostC{
  post!:Post;
  userId!:number;


  constructor(post: Post, userId: number) {
    this.post = post;
    this.userId = userId;
  }
}
