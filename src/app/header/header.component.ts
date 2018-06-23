import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from "../model/user";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 public isAuth: boolean;
 user : User;
public  uloga_id:number;
  constructor(private _router: Router,private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isAuth = true;
      this.loadUser();
    } else {
      this.isAuth = false;
    }
  }
  loadUser() {
        this.userService.getUser()
            .subscribe(data => {
                this.user = data
                this.uloga_id=this.user['uloga_id'];
            });


    }
  public logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.isAuth = false;
      location.reload();
    }
}
