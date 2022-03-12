import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../models/Post";
import {Image} from "../../models/Image";
import {StatusPost} from "../../models/Enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {PostServiceService} from "../../service/postService/post-service.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TokenService} from "../../service/auth/token.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

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

  formCreate!: FormGroup;
  constructor(private http: HttpClient, private postService: PostServiceService, private router: Router,private storage: AngularFireStorage,private tokenService: TokenService) {
    this.findAll();
    // this.findAllComment()

    this.formCreate = new FormGroup({
      id: new FormControl(this.post?.id),
      content: new FormControl(this.post?.content,Validators.minLength(6)),
      status: new FormControl(this.post?.status),
      link: new FormControl(this.img?.link),

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
    this.postService.create(this.formCreate.value, this.tokenService.getId(), this.arrayFile).subscribe(() => {
      alert("Create thanh cong")
      // this.findAll()
    })
    window.location.reload()
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
}
