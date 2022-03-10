import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowPostComponent} from "./post/show-post/show-post.component";
import {LoginComponent} from "./login-logout/login/login.component";
import {RegisterComponent} from "./login-logout/register/register.component";
import {UserAccountComponent} from "./login-logout/user-account/user-account.component";

const routes: Routes = [
  {path: "post" , component: ShowPostComponent},
  {path: "" , component: RegisterComponent},
  {path: "login" , component: LoginComponent},
  {path: "register" , component: RegisterComponent},
  {path: "user-account" , component: UserAccountComponent},
  {
    path: 'admin', loadChildren: () => import('./post/show-post/post.module').then(module => module.PostModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
