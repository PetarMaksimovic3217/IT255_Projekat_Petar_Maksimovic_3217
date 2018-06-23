import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {RegisterService} from "../services/register.service";
import User from "../model/user";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  registracijaForm = new FormGroup({
     ime: new FormControl("",[Validators.required,Validators.minLength(3)]),
     prezime: new FormControl("",[Validators.required,Validators.minLength(4)]),
     adresa: new FormControl("",[Validators.required,Validators.minLength(5)]),
     email: new FormControl("",[Validators.required,Validators.minLength(3),,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
     lozinka: new FormControl("",[Validators.required,Validators.minLength(4)])
   });
  constructor(private http: Http,private router: Router, private registerService: RegisterService) {
   if (localStorage.getItem('token') != null) {
        //localStorage.removeItem('token'); /*brisanje tokena ako je neko ulogovan!!!!!*/
       this.router.navigateByUrl('');
     }
     else{
         this.router.navigateByUrl('register');
     } }


  onRegistracija(model: User) {
  //  console.log(model.ime);
    this.registerService.callService(model).subscribe(data => {
    alert("Successfully registered account!!")
      //  localStorage.setItem('token', data['token']);
        this.router.navigateByUrl('login');
      },err => {
              alert(JSON.parse(err._body).error);
            });

    }
}
