import { Component,Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {PostServiceService} from "../../service/postService/post-service.service";
import {Post} from "../../models/Post";
import {Comment} from "../../models/Comment";

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
  comments: any;
  commentId: any;
  content: string = "";
  users = window.sessionStorage.getItem('User_Key');
  formEditComment: FormGroup = new FormGroup({
    content: new FormControl('')
  });
  // @ts-ignore
  result: boolean;

  showComment!: Comment;
  // @ts-ignore
  contentComment: string;
  // @ts-ignore
  idComment: number;
  postComment!: Comment;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: PostServiceService,) {
    this.getAll(this.postId);
    this.unknownId = window.sessionStorage.getItem('Id_Key');
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
  }



  getAll(postId :number){

    this.service.findAllCommentByPostId(postId).subscribe(
      result => {
        console.log(result)
        this.comments = result;
      }, error => {
        console.log(error);
      }
    )
  }

  deleteComment(commentId: number) {
    this.service.deleteComment(commentId).subscribe(
      ()=> {
        this.getAll(this.postId);
      }, error => {
        console.log(error);
      }
    );
  }

  createComment() {
    this.content = this.formComment.get('content')?.value;
    console.log("this.postId")
    console.log(this.postId)
    let currentDate = new Date();
    let comment: Comment = {
      // @ts-ignore
      users_id: this.unknownId,
      post_id: this.postId,
      content: this.content,
    };
    this.service.createComment( comment,this.postId ).subscribe(() => {
        this.formComment.reset();
      }, error => {
        console.log(error);
      }
    );

  }

  showEditComment(comment: Comment) {
    console.log("check ham showedit comment")
    this.service.findCommentById(comment.id).subscribe((data) => {
      console.log("show data", data)
      this.contentComment = data.content ;
      // this.showComment = data;
      this.idComment = data.id;
    })
  }

  ngSubmitEditComment() {
    console.log("this.idComment")
    console.log(this.idComment)
    // @ts-ignore
    this.postComment = new Comment(
      this.contentComment,
    )
    this.service.editComment(this.postComment, this.idComment).subscribe(data => {
      alert("OK")
      this.getAll(this.postId);
    })
  }

  checkId(userCurrentId: any, userId: any): boolean {
    if (userCurrentId != userId) {
      return false;
    } else {
      return true;
    }
  }
}
