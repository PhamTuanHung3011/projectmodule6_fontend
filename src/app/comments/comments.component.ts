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
  // @ts-ignore
  contentComment: string;
  // @ts-ignore
  id: number;
  postComment!: Comment;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: PostServiceService,) {
    this.getAll();
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
    this.getAll();
  }

  createComment() {
    this.content = this.formComment.get('content')?.value;

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

  getAll(){
    this.service.findAllComment().subscribe(
      result => {
        this.comments = result;
      }, error => {
        console.log(error);
      }
    )
  }

  deleteComment(commentId: number) {
    this.service.delete(commentId).subscribe(
      ()=> {
        this.getAll();
      }, error => {
        console.log(error);
      }
    );
  }

  // showEditComment(comment: Comment) {
  //   console.log("check ham showedit")
  //   this.service.findCommentById(comment.id).subscribe((data) => {
  //     console.log("show data", data)
  //     this.contentComment = data.content ;
  //     this.id = data.id;
  //   })
  // }
  //
  // ngSubmitEditComment() {
  //   // @ts-ignore
  //   this.postComment = new Comment(
  //     this.contentComment,
  //   )
  //   this.service.editComment(this.postComment,this.id).subscribe(data => {
  //     this.getAll();
  //   })
  // }

  checkId(userCurrentId: any, userId: any): boolean {
    if (userCurrentId != userId) {
      return false;
    } else {
      return true;
    }
  }
}
