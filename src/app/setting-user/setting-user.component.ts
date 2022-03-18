import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../service/auth/token.service";
import {UserService} from "../../service/userService/user.service";
import {Users} from "../../models/Users";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.css']
})
export class SettingUserComponent implements OnInit {
  id!: any;
  user!: Users;
  formEdit!:FormGroup;
  constructor(private router:Router,private authService: AuthService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private userService: UserService) {
  this.productDetail()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id'];
      this.showUserById();
      this.formEdit = new FormGroup({
        username: new FormControl(this.user.username),
        name: new FormControl(this.user.name),
        password: new FormControl(this.user.password),
        email: new FormControl(this.user.email),
        gender: new FormControl(this.user.gender),
        phone: new FormControl(this.user.phone),
        address: new FormControl(this.user.address),

      })
    })
  }

  showUserById() {
    this.userService.findById(this.id).subscribe(data => {
      console.log(data)
      this.user = data;
    })
  }
  productDetail() {
    this.userService.findById(this.id).subscribe(data => {
      this.user = data;
      this.formEdit.controls['username']?.setValue(this.user.id)
      this.formEdit.controls['name']?.setValue(this.user.name)
      this.formEdit.controls['password']?.setValue(this.user.password)
      this.formEdit.controls['email']?.setValue(this.user.email)
      this.formEdit.controls['radio']?.setValue(this.user.gender)
      this.formEdit.controls['phone']?.setValue(this.user.phone)
      this.formEdit.controls['country']?.setValue(this.user.address)

    })
  }
  edit() {
    this.userService.edit(this.formEdit.value).subscribe(() =>{
      alert("edit thanh cong")
      this.router.navigate(['/about/'+this.id]);
    })
  }
}
