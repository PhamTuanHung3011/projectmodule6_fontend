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

  post: Post = new Post(0,"",StatusPost[StatusPost.EVERYONE],new Date(),0);
  img: Image = new Image(0,"");
  enum: StatusPost[] = [];

  // @ts-ignore
  name_user2: string;
  // @ts-ignore
  name_user1: string;
  checkLogin = true;

  formCreate!: FormGroup;
  constructor(private http: HttpClient, private postService: PostServiceService, private router: Router,private storage: AngularFireStorage,private tokenService: TokenService) {
    this.findAll();
  }

  ngOnInit(): void {
    this.formCreate = new FormGroup({
      // id: new FormControl(0),
      // title: new FormControl("",Validators.minLength(6)),
      // price: new FormControl(0,Validators.pattern('[1-4]')),
      // description: new FormControl("",[Validators.required, Validators.minLength(10)]),
      id: new FormControl(this.post.id),
      content: new FormControl(this.post.content,Validators.minLength(6)),
      status: new FormControl(this.post.status),
      link: new FormControl(this.img.link)
    })
    // @ts-ignore
    this.name_user2 = window.sessionStorage.getItem('Name_Key')
  }

  findAll() {
    this.postService.findAll().subscribe(data => {
      this.posts = data;
    }, error => {})
  }

  create() {
    this.postService.create(this.formCreate.value).subscribe(() => {
      alert("Create thanh cong")
      this.findAll()
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

}
