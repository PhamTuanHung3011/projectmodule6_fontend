import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {finalize} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../service/auth/token.service";
import {Post} from "../../models/Post";
import {Post_dto} from "../../models/Post_dto";
import {UserService} from "../../service/userService/user.service";
import {PostServiceService} from "../../service/postService/post-service.service";
import {Image} from "../../models/Image";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined

  @Input() userId : any;

  selectedImg: any = null;
  arrayFile = '';
  status: any;
  // @ts-ignore
  // user: Users = {};
  // users: any;
  post_dtos: Post_dto[] = [];
  // posts: Post[] = []
  post: Post = new Post('','',new Date(),0);
  // @ts-ignore
  post_dto: Post_dto = new Post_dto(0,"","",new Date(),0,[])
  img: Image = new Image(0,"");

  // @ts-ignore
  name_user2: string;
  checkLogin = true;

  formCreate!: FormGroup;
  constructor(private userService: UserService,private activatedRoute: ActivatedRoute,private http: HttpClient, private postService: PostServiceService, private router: Router,private storage: AngularFireStorage,private tokenService: TokenService) {

    this.formCreate = new FormGroup({
      id: new FormControl(this.post?.id),
      content: new FormControl(this.post?.content,Validators.minLength(6)),
      status: new FormControl(this.post?.status),
      link: new FormControl(this.img?.link),
    })
    this.status = [
      {model: 'Public'},
      {model: 'Private'},
      {model: 'Friend only'}
    ];
    this.findAll()
  }

  ngOnInit(): void {
    // @ts-ignore
    this.name_user2 = window.sessionStorage.getItem('Name_Key')
    // this.users = localStorage.getItem('User_Key');
    // this.userService.findById(this.users).subscribe(value => {
    //   this.user = value;
    // });
  }

  findAll() {
    this.postService.findAll().subscribe(data => {
      this.post_dtos = data;
    }, error => {})
  }

  create() {
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

  // edit(formEdit: any) {
  //   this.postService.edit(formEdit).subscribe(() => {
  //     alert("edit thành công");
  //     this.getPostByUserId()
  //   })
  //   window.location.reload()
  // }

  delete(id: number) {
    this.postService.delete(id).subscribe(() => {
      alert("xóa thành công");
      this.getPostByUserId()
    })
  }

  getPostByUserId() {
    this.postService.findAllPostByUserCurrent(this.tokenService.getId()).subscribe(data => {
      this.post_dtos = data;
    });
  }
}
