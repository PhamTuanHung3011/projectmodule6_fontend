import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/userService/user.service";
import {Observable} from "rxjs";
import {Users} from "../../models/Users";
import {Gender} from "../../models/Enum";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  id!: number;
  user!: Users;

  constructor(private userService: UserService, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id']
      this.showDetailsUser();
    })
  }

  public showDetailsUser() {
    this.userService.findById(this.id).subscribe(data => {
      console.log("Data--->",data)
      this.user = data;
    })
  }
}
