import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../models/Post";
import {Image} from "../../../models/Image";
import {PostServiceService} from "../../../service/postService/post-service.service";
import {StatusPost} from "../../../models/Enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TokenService} from "../../../service/auth/token.service";
import {Post_dto} from "../../../models/Post_dto";
import {Comment} from "../../../models/Comment";
import {CommentService} from "../../../service/commentService/comment.service";

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined

  selectedImg: any = null;
  arrayFile = '';

  posts: Post[] = []
  users = window.sessionStorage.getItem('User_Key');
  post: Post = new Post('','',new Date(),0);
  // post_dto: Post_dto = new Post_dto(0,StatusPost[StatusPost.EVERYONE],new Date(),0, users )
  img: Image = new Image(0,"");
  enum: StatusPost[] = [];


  // @ts-ignore
  name_user2: string;
  checkLogin = true;

  comments: Comment[] = []
  comment: Comment = new Comment(0,'',new Date());

  formCreateComment!: FormGroup;

  formCreate!: FormGroup;
  constructor(private http: HttpClient, private commentService: CommentService, private postService: PostServiceService, private router: Router,private storage: AngularFireStorage,private tokenService: TokenService) {
    this.findAll();
    this.findAllComment()

    this.formCreate = new FormGroup({
      id: new FormControl(this.post?.id),
      content: new FormControl(this.post?.content,Validators.minLength(6)),
      status: new FormControl(this.post?.status),
      link: new FormControl(this.img?.link),

    })

    this.formCreateComment = new FormGroup({
      id: new FormControl(this.comment?.id),
      content: new FormControl(this.comment?.content),
    })
  }

  ngOnInit(): void {
    // @ts-ignore
    this.name_user2 = window.sessionStorage.getItem('Name_Key')
  }

  findAll() {
    this.postService.findAll().subscribe(data => {
      this.posts = data;
    }, error => {})
  }

  create() {
    console.log('form Create == >', this.formCreate.value)
    console.log('get ID --> ', this.tokenService.getId())
    console.log('list anh -->', this.arrayFile)
    this.postService.create(this.formCreate.value, this.tokenService.getId(), this.arrayFile).subscribe(() => {
      alert("Create thanh cong")
      // this.findAll()
    })
    window.location.reload()
  }

  submit() {
    if (this.selectedImg != null) {
      const filePath = this.selectedImg.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges()
        .pipe(finalize(() => (fileRef.getDownloadURL()
          .subscribe(url => {
            this.arrayFile = url;
            console.log(url);
          })))
        ).subscribe()
    }
  }

  uploadFileImg() {
    this.selectedImg = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

  showEdit(post: Post) {
    console.log("check ham showedit")
    this.postService.findById(post.id).subscribe((data) => {
      this.post = data;
      console.log("show data", data)
    })
  }

  edit(formEdit: any) {
    this.postService.edit(formEdit).subscribe(() => {
      alert("edit thành công");
      this.findAll()
    })
    window.location.reload()
  }

  delete(id: number) {
    this.postService.delete(id).subscribe(() => {
      alert("xóa thành công");
      this.findAll()
    })

  }

  // Comment

  findAllComment() {
    this.commentService.findAll().subscribe(data => {
      this.comments = data;
    }, error => {})
  }

  createComment() {
    this.commentService.create(this.formCreateComment.value, this.tokenService.getId(),this.tokenService.getId()).subscribe(() => {
      alert("Create thanh cong")

    })
    window.location.reload()
  }

  showEditComment(comment: Comment) {
    this.commentService.findById(comment.id).subscribe((data) => {
      this.comment = data;
      console.log("show data", data)
    })
  }

  editComment(formEdit: any) {
    this.commentService.edit(formEdit).subscribe(() => {
      alert("edit thành công");
      this.findAll()
    })
    window.location.reload()
  }

  deleteComment(id: number) {
    this.commentService.delete(id).subscribe(() => {
      alert("xóa thành công");
      this.findAll()
    })

  }

}
