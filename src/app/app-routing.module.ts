import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {TimeLineComponent} from "./time-line/time-line.component";
import {SearchUserComponent} from "./search-user/search-user.component";
import {FriendComponent} from "./friend/friend.component";

import {HeaderComponent} from "./header/header.component";
import {DetailsUserComponent} from "./details-user/details-user.component";
import {AuthGuard} from "@angular/fire/auth-guard";
// import {AccountSettingComponent} from "./account-setting/account-setting.component";


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'header',component:HeaderComponent},
  {path:'home',component:HomeComponent },
  {path:'time-line/:id',component:TimeLineComponent},
  {path:'register',component: RegisterComponent},
  {path:'about/:id',component: AboutComponent},
  {path:'search-user',component: SearchUserComponent},
  {path:'friend/:id',component: FriendComponent},
  {path:'details-user/:id',component: DetailsUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
