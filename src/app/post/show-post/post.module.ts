import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailPostComponent} from "../detail-post/detail-post.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostRoutingModule} from "./post-routing.module";

@NgModule({
  declarations: [
    DetailPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule
  ]
})
export class PostModule { }
