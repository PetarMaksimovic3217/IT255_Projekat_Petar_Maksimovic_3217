import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http,Headers } from '@angular/http';
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService} from "../services/login.service";
import  User from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  public loginForm = new FormGroup({
email: new FormControl("",[Validators.required,Validators.minLength(8),,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
lozinka: new FormControl("",[Validators.required,Validators.minLength(4)])
});
           token: User;
           error:String;
  constructor(private http: Http, private router: Router,private loginService: LoginService) {
  if (localStorage.getItem('token') != null) {
        this.router.navigateByUrl('');
        alert("Uspešno ste loginovani");

      }
      else{
        this.router.navigateByUrl('login');
      }
   }


 public login(model: User):void {
   this.token = JSON.parse(localStorage.getItem('token'));
    this.loginService.callService(model).subscribe(data => {
      localStorage.setItem('token', data['token']);
         location.reload();
      this.router.navigateByUrl('/onama');
    }, err => {
         this.error=JSON.parse(err._body).error;
          //  alert(JSON.parse(err._body).error);
          });


}
}
