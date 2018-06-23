import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import {Router} from '@angular/router';
import {KorpaService} from "../services/korpa.service";
import {UserService} from "../services/user.service";
import {SharedService} from "../services/shared.service";

import Boat from "../model/boat";
import Period from "../model/period";
import { timer} from "rxjs";
import User from "../model/user";
@Component({
  selector: 'app-your-reservations',
  templateUrl: './your-reservations.component.html',
  styleUrls: ['./your-reservations.component.scss']
})
export class YourReservationsComponent implements OnInit {
  user : User;
 prRezervacije: Boat[];
 idKorpe: number;
 period: Period[];
 totalPrice: number = 0;
 isDone : boolean = false;
 skiper:number=0;
 price: number=0;
 checkbox:boolean;
  constructor(private http: Http, private router: Router, private cartService: KorpaService, private userService: UserService, private sharedService :SharedService) {
    if (localStorage.getItem('token') != null) {
          this.router.navigateByUrl('your-reservations');

        }
        else{
          this.router.navigateByUrl('login');
        }
   }

  ngOnInit() {
    this.loadResevations();
  }
  loadResevations(){
      this.cartService.getReservation()
          .subscribe(data => {
              this.prRezervacije = data
              //this.idKorpe=this.prKorpa['idKorpe']

          });

    //  this.idKorpe=this.prKorpa['id_korpe'];

  }
}
