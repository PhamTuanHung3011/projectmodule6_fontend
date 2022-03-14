import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListFriendComponent} from "./list-friend/list-friend.component";
import {LoginComponent} from "./login-logout/login/login.component";
import {RegisterComponent} from "./login-logout/register/register.component";
import {ShowPostComponent} from "./post/show-post/show-post.component";
import {UserAccountComponent} from "./login-logout/user-account/user-account.component";
import {UpdateUserComponent} from "./update-user/timeline/update-user.component";
import {ProfileComponent} from "./update-user/profile/profile.component";

const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component: RegisterComponent},
  {path:'listfriend',component:ListFriendComponent},
  {path:'post',component:ShowPostComponent},
  {path: "user-account" , component: UserAccountComponent},
  {path: "time-line" , component: UpdateUserComponent},
  {path: "profile" , component: ProfileComponent},
  {
    path: 'admin', loadChildren: () => import('./post/show-post/post.module').then(module => module.PostModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
