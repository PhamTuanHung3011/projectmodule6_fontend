import { Component,Input, OnInit } from '@angular/core';
import {CommentService} from "../../../service/commentService/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Comment} from "../../../models/Comment";
import {Post} from "../../../models/Post";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId: any;
  formComment = new FormGroup(
    {content: new FormControl('')}
  );
  unknownId: any;
  // @ts-ignore
  comment: Comments;
  comments: Comment[] = [];
  commentId: any;
  content: string = "";
  users = window.sessionStorage.getItem('User_Key');
  comment1: Comment = new Comment(0,'',new Date());
  userIdCurrent = localStorage.getItem('ID');
  formEditComment: FormGroup = new FormGroup({
    content: new FormControl('')
  });
  // @ts-ignore
  result: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService) {
    this.getAll(this.postId);
    this.unknownId = localStorage.getItem('ID');
  }

  ngOnInit(): void {
    this.formComment = new FormGroup(
      {content: new FormControl('')}
    );
    this.activatedRoute.paramMap.subscribe(result => {
      // @ts-ignore
      let currentId: any = result.params.id;
      this.result = this.checkId(this.unknownId, currentId);
    }, error => {
      console.log(error);
    });
    this.getAll(this.postId);

    this.activatedRoute.paramMap.subscribe(
      async result => {
        this.postId = result.get('postId');
        this.commentId = result.get('commentId');
        this.comment = await this.getDataComment(this.postId, this.commentId);
        this.formEditComment.get('content')?.setValue(this.comment.content);
      }
    );
  }

  createComment() {
    this.content = this.formComment.get('content')?.value;

    let currentDate = new Date();
    let comment: Comment = {
      // @ts-ignore
      users_id: this.unknownId,
      post_id: this.postId,
      content: this.content,
      date_comment:currentDate
    };
    this.commentService.create(comment).subscribe(() => {
        this.formComment.reset();
      }, error => {
        console.log(error);
      }
    );

  }

  getAll(postId: number){
    this.commentService.findAllCommentByPostId(postId).subscribe(
      result => {
        this.comments = result;
      }, error => {
        console.log(error);
      }
    )
  }

  deleteComment(commentId: number) {
    this.commentService.delete(commentId).subscribe(
      ()=> {
        this.getAll(this.postId);
      }, error => {
        console.log(error);
      }
    );
  }

  checkId(userCurrentId: any, userId: any): boolean {
    if (userCurrentId != userId) {
      return false;
    } else {
      return true;
    }
  }

  getDataComment(postId: any, commentId: any) {
    return this.commentService.findCommentByCommentId(postId, commentId).toPromise()
  }

  editComment() {
    this.content = this.formEditComment.get('content')?.value;
    let currentDate = new Date();
    let comment: Comment = {
      id: this.comment.id,
      // @ts-ignore
      users_id: this.unknownId,
      post_id: this.postId,
      content: this.content,
      date_comment: currentDate
    }
    this.commentService.edit(this.commentId, comment).subscribe(
      result => {
        this.getAll(this.postId)
      }, error => {
        console.log(error);
      }
    );
  }
}
