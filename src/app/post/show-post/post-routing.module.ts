import { NgModule } from '@angular/core';
import {DetailPostComponent} from "../detail-post/detail-post.component";
import {ShowPostComponent} from "./show-post.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'detail/:id', component: DetailPostComponent},
  {path: 'show', component: ShowPostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
