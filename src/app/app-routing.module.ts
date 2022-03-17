import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {TimeLineComponent} from "./time-line/time-line.component";
import {SearchUserComponent} from "./search-user/search-user.component";
import {FriendComponent} from "./friend/friend.component";
import {AuthGuard} from "./auth.guard";
import {HeaderComponent} from "./header/header.component";
import {DetailsUserComponent} from "./details-user/details-user.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'header',component:HeaderComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard] },
  {path:'time-line/:id',component:TimeLineComponent,canActivate:[AuthGuard]},
  {path:'register',component: RegisterComponent},
  {path:'about/:id',component: AboutComponent,canActivate:[AuthGuard]},
  {path:'search-user',component: SearchUserComponent,canActivate:[AuthGuard]},
  {path:'friend/:id',component: FriendComponent,canActivate:[AuthGuard]},
  {path:'details-user/:id',component: DetailsUserComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
