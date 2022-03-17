import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../models/Post";
import {Image} from "../../models/Image";
import {UserService} from "../../service/userService/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PostServiceService} from "../../service/postService/post-service.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TokenService} from "../../service/auth/token.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {Post_dto} from "../../models/Post_dto";
import {Users} from "../../models/Users";
import {PostC} from "../../models/PostC";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined
  @ViewChild('uploadFile1', {static: true}) public avatarDom1: ElementRef | undefined

  @Input() userId: any;

  selectedImg: any = null;
  selectedImg1: any = null;
  arrfiles: any = [];
  arrfiles1: any = [];
  arrayPicture: string[] = [];





  post!:  Post;
  postEdit!: Post;
  // @ts-ignore
  content: string;
  // @ts-ignore
  image: string;
  // @ts-ignore
  contentEdit: string;




  posts: Post[] = [];

 // @ts-ignore
  users: Users;
  // @ts-ignore
  userCurrent: Users;


  post_dto: any;
  post_dto_edit: any = {};
  // @ts-ignore
  id: number;
  idCurrent=window.sessionStorage.getItem('Id_Key');


// @ts-ignore
  status = 'Public';


  formCreate: any;

  constructor (private userService: UserService, private activatedRoute: ActivatedRoute, private http: HttpClient, private postService: PostServiceService, private router: Router, private storage: AngularFireStorage, private tokenService: TokenService) {

    // @ts-ignore
    this.statuss = [
      {model: 'Public'},
      {model: 'Private'},
      {model: 'Friend only'}
    ];

  }

  ngOnInit(): void {
    // @ts-ignore
    this.userCurrent = JSON.parse(window.sessionStorage.getItem("User_Key"));
    // this.users.id = this.tokenService.getId();
    this.id = this.post.id;
    this.findAll();
  }

  findAll() {
    this.postService.findAll().subscribe(data => {
      this.post_dto = data;
      console.log("data")
      console.log(data)
    }, error => {
    })
  }

  // ngSubmit() {
  //   // @ts-ignore
  //   this.post = new Post(
  //     this.content,
  //      this.arrfiles
  //   )
  //  let postC = new PostC(this.post,this.tokenService.getId())
  //   this.postService.create(postC).subscribe(data => {
  //     this.findAll();
  //   },
  //   (error:HttpErrorResponse)=>{
  //     alert(error);
  //   })
  // }
  ngSubmit() {
    // @ts-ignore

    console.log('this.userCurrent')
    console.log(this.userCurrent)

    this.post = new Post(
      this.content,
      this.userCurrent,
      this.arrfiles,
    )
    this.postService.create(this.post).subscribe(data => {
      alert("create thanh cong")
          this.findAll();
  })
  }

  ngSubmitEdit() {
    // @ts-ignore
    this.postEdit = new Post(
      this.content,
      this.arrfiles1
    )
    this.postService.edit(this.postEdit, this.id).subscribe(data => {
     this.findAll();
    })
  }

  submit() {
    if (this.selectedImg != null) {
      const filePath = this.selectedImg.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges()
        .pipe(finalize(() => (fileRef.getDownloadURL()
          .subscribe(url => {
            this.arrfiles = url;
            console.log(url);
            alert("ok")
          })))
        ).subscribe()
    }
  }
  submit1() {
    if (this.selectedImg1 != null) {
      const filePath = this.selectedImg1.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg1).snapshotChanges()
        .pipe(finalize(() => (fileRef.getDownloadURL()
          .subscribe(url => {
            this.arrfiles1 = url;
            console.log(url);
            alert("da edit anh thanh cong")
          })))
        ).subscribe()
    }
  }

  uploadFileImg() {
    this.selectedImg = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }
  uploadFileImg1() {
    // @ts-ignore
    this.selectedImg1 = this.avatarDom1.nativeElement.files[0];
    this.submit1();
  }

  showEdit(post: Post) {
    console.log("check ham showedit")
    this.postService.findById(post.id).subscribe((data) => {
      console.log("show data", data)
      this.post_dto_edit = data ;

    })
  }

  edit(formEdit: any) {
    console.log("vao form edit")
    // @ts-ignore
    this.postService.edit(formEdit).subscribe(() => {
      alert("edit thành công");
    })
  }

  // delete(id: number) {
  //   this.postService.delete(id).subscribe(() => {
  //     alert("xóa thành công");
  //     this.findAll()
  //   })
  // }

  getPostByUserId() {
    this.postService.findAllPostByUserCurrent(this.tokenService.getId()).subscribe(data => {
      this.post_dto = data;
    });
  }
}
