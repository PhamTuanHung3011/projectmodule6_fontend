import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../models/Post";
import {Image} from "../../models/Image";
import {UserService} from "../../service/userService/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PostServiceService} from "../../service/postService/post-service.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TokenService} from "../../service/auth/token.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {Post_dto} from "../../models/Post_dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined

  @Input() userId: any;

  selectedImg: any = [];
  arrayFile : string[] = [] ;
// @ts-ignore
// user: Users = {};

  post_dto: any;
  post_dto_edit: any = {};
  users = window.sessionStorage.getItem('User_Key');
  idCurrent = window.sessionStorage.getItem('Id_Key');
  post:  Post = new Post('', '', new Date(), 0);
  // post_dto1: Post_dto = new Post_dto(0,"","",new Date(),0,[]);
  img: Image = new Image(0, "");

// @ts-ignore
  status = 'Public';
  statuss: any;

  formCreate: any;

  constructor (private userService: UserService, private activatedRoute: ActivatedRoute, private http: HttpClient, private postService: PostServiceService, private router: Router, private storage: AngularFireStorage, private tokenService: TokenService) {

    this.formCreate = new FormGroup({
      id: new FormControl(this.post?.id),
      content: new FormControl(this.post?.content, Validators.minLength(6)),
      status: new FormControl(this.post?.status),
      link: new FormControl(this.img?.link),
    })
    this.statuss = [
      {model: 'Public'},
      {model: 'Private'},
      {model: 'Friend only'}
    ];

  }

  ngOnInit(): void {
    this.findAll()
    // this.getPostByUserId()
    // @ts-ignore
    // this.users = localStorage.getItem('User_Key');
    // this.userService.findById(this.users).subscribe(value => {
    //   this.user = value;
    // });
  }

  findAll() {
    this.postService.findAll().subscribe(data => {
      this.post_dto = data;
      console.log("data")
      console.log(data)
    }, error => {
    })
  }

  create() {
    let pr = this.formCreate.get('status').value;
    if (pr == '') {
      this.formCreate.get('status').setValue('Public');
    }
    this.postService.create(this.formCreate.value, this.tokenService.getId(), this.arrayFile).subscribe(() => {
      alert("Create thanh cong")
      this.findAll()
    })
    // window.location.reload()
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
            alert("ok")
          })))
        ).subscribe()
    }
  }

  uploadFileImg() {
    this.selectedImg = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

  showEdit(postdto: Post_dto) {
    console.log("check ham showedit")
    this.postService.findById(postdto.id).subscribe((data) => {
      console.log("show data", data)
      this.post_dto_edit = data ;

    })
  }

  edit(formEdit: any) {
    // @ts-ignore
    this.postService.edit(formEdit).subscribe(() => {
      alert("edit thành công");
    })
  }

  delete(id: number) {
    this.postService.delete(id).subscribe(() => {
      alert("xóa thành công");
      this.findAll()
    })
  }

  getPostByUserId() {
    this.postService.findAllPostByUserCurrent(this.tokenService.getId()).subscribe(data => {
      this.post_dto = data;
    });
  }
}
