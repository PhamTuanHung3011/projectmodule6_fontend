import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/userService/user.service";
import {Users} from "../../../models/Users";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idUser: any;
  gender: any;
  user!: Users;
  updateForm: any;
  user2!: string;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage) {
    this.gender = [
      {model: 'Male'},
      {model: 'Female'},
      {model: ''}
    ];
    this.checkLogin()
  }

  ngOnInit(): void {
    // @ts-ignore
    this.user2 = window.sessionStorage.getItem('Name_Key')
    this.editForm();
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
      birthday: [''],
      description: [''],
      bio: [''],
    });
  }

  checkLogin() {
    if (this.user2 == null) {
      this.router.navigate(['login']);
    } else {
      this.idUser = localStorage.getItem('Id_Key');
      this.userService.findById(this.idUser).subscribe(value => {
        this.user = value;
        this.updateForm.patchValue(this.user);
      });
    }
  }

  editUser() {
    this.user.name = this.updateForm.get('name')?.value;
    this.user.username = this.updateForm.get('username')?.value;
    this.user.phone = this.updateForm.get('phone')?.value;
    this.user.email = this.updateForm.get('email')?.value;
    this.user.address = this.updateForm.get('address')?.value;
    this.user.birthday = this.updateForm.get('birthday')?.value;
    this.user.avatar = this.updateForm.get('avatar')?.value;
    this.user.password = this.updateForm.get('password')?.value;
    console.log(this.user);
    this.userService.edit(this.user).subscribe(value => {
      this.updateForm.patchValue(this.user);
      alert('Success');
    }, error => {
      console.log(error);
    });
  }

}
