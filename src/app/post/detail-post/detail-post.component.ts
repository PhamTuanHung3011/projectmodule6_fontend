import { Component, OnInit } from '@angular/core';
import {PostServiceService} from "../../../service/postService/post-service.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Post} from "../../../models/Post";
import {StatusPost} from "../../../models/Enum";
import {Image} from "../../../models/Image";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  img: Image = new Image(0,"");

  id!: number;
  constructor(private service: PostServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(<string>paramMap.get('id'))
      this.tourDetail()
    });
  }

  ngOnInit(): void {
  }

  post!: Post;

  tourDetail() {
    this.service.findById(this.id).subscribe(data => {
      this.post = data;
      console.log(this.post);
    })
  }

}
