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

  formCreate!: FormGroup;
  constructor(private http: HttpClient, private postService: PostServiceService, private router: Router,private storage: AngularFireStorage) {
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
    this.postService.findById(post.id).subscribe((data) => {
      this.post = data;
    })
  }

  edit(formEdit: any) {
    this.postService.edit(formEdit).subscribe(() => {
      alert("edit thành công");
      this.findAll()
    })
  }

  delete(id: number) {
    this.postService.delete(id).subscribe(() => {
      alert("xóa thành công");
      this.findAll()
    })

  }

}
