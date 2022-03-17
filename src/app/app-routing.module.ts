import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {ListFriendComponent} from "./list-friend/list-friend.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {TimeLineComponent} from "./time-line/time-line.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'time-line',component:TimeLineComponent},
  {path:'register',component: RegisterComponent},
  {path:'about',component: AboutComponent},
  {path:'listfriend',component:ListFriendComponent},
  {path:'logout',component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
