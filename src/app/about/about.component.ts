import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/auth/token.service";
import {AuthService} from "../../service/auth/auth.service";
import {Users} from "../../models/Users";
import {UserService} from "../../service/userService/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Role} from "../../models/Role";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  updateForm: any;
  user2!: string;
  genders: any;
  gender = 'MALE';
  username:any;
  Iduser!:any;
  user!:Users;
  curentUser!:Users

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private  activatedRoute:ActivatedRoute,
              private tokenService: TokenService,
              private userService:UserService) {
    this.genders = [
      {model: 'MALE'},
      {model: 'FEMALE'},
      {model: '#'}
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.Iduser = data['id'];
    })
  this.showUserById();
  }

  showUserById(){
    console.log("this.idUser")
    console.log(this.curentUser)
    console.log(this.Iduser)

  this.userService.findById(this.Iduser).subscribe(data =>{
    console.log(data)
    this.user = data;
  })
  }

  findUserById() {
    this.userService.findById(this.user.id).subscribe(() => {
    })
  }

  editForm() {
    this.updateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
      address: new FormControl(''),
      avatar: new FormControl(''),
      email: new FormControl(''),
      status: new FormControl('')
    });
  }

  checkLogin() {
      this.showUserById()
      this.updateForm.patchValue(this.user);
  }

  editUser() {
    this.user.name = this.updateForm.get('name')?.value;
    this.user.username = this.updateForm.get('username')?.value;
    this.user.phone = this.updateForm.get('phone')?.value;
    this.user.email = this.updateForm.get('email')?.value;
    this.user.address = this.updateForm.get('address')?.value;
    this.user.avatar = this.updateForm.get('avatar')?.value;
    this.user.password = this.updateForm.get('password')?.value;
    let pr = this.updateForm.get('gender')?.value;
    if (pr == '') {
      this.updateForm.get('gender').setValue('MALE');
    }
    console.log(this.user);
    this.userService.edit(this.user).subscribe(value => {
      this.updateForm.patchValue(this.user);
      alert('Success');
    }, error => {
      console.log(error);
    });
  }

}
