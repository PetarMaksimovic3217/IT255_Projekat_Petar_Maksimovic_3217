import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {KorpaService} from "../services/korpa.service";
import {UserService} from "../services/user.service";
import {SharedService} from "../services/shared.service";
import {GetperiodService} from "../services/getperiod.service";
import Boat from "../model/boat";
import Period from "../model/period";
import { timer} from "rxjs";
import User from "../model/user";
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  public periodForm = new FormGroup({
  period_id:new FormControl(),
  skiper:new FormControl()
  });

      user : User;
     prKorpa: Boat[];
     idKorpe: number;
     period: Period[];
     totalPrice: number = 0;
     isDone : boolean = false;
     skiper:number=0;
     price: number=0;
     checkbox:boolean;
  constructor(private http: Http, private router: Router, private cartService: KorpaService, private userService: UserService, private sharedService :SharedService,private getPeriod: GetperiodService) {
    if (localStorage.getItem('token') == null) {
          this.router.navigateByUrl('login');
      }
   }

  ngOnInit() {
    this.loadCart();
       this.loadUser();
       this.loadPeriod();

  }
  loadUser() {
        this.userService.getUser()
            .subscribe(data => {
                this.user = data
            });


    }

    loadCart(){
        this.cartService.getCart()
            .subscribe(data => {
                this.prKorpa = data
                //this.idKorpe=this.prKorpa['idKorpe']
                console.log(this.prKorpa['idKorpe'])
            });

      //  this.idKorpe=this.prKorpa['id_korpe'];

    }

    loadPeriod(){
        this.getPeriod.getPeriod()
            .subscribe(data => {
                this.period = data
            });



    }

    remove(product_id: number) {
        this.cartService.removeFromCart(product_id);
        location.reload();

    }

    checkout() {
        this.isDone = true;
        this.cartService.checkout();
        let time = timer(1000, 500);
        time.subscribe(t => {
            location.reload();
            alert("Congratulations!!! You successfully reserved your yacht")
            this.router.navigateByUrl('your-reservations');
        });
    }

    update(boat_id: number, period: number) {

        this.cartService.updateInCart(boat_id, period['period_id']);
        alert("Successfully updated the dates for your journey")
        //  location.reload();
    }




    getTotal() {

        let total = 0;
        for (var i = 0; i < this.prKorpa.length; i++) {
            if (this.prKorpa[i].cena) {
                total += this.prKorpa[i].cena;
                this.totalPrice = total;
                this.idKorpe = this.prKorpa[i].id_korpe;
            }
        }

        return total;
    }
    updateValue(){
      if(!this.checkbox)
    {
      this.skiper=0;


    }
    else
    {
    this.skiper=1;
      //actually this else part shouldn't be needed
    }
    }
    getTotalWithSkiper() {
        let skiper=700;
        let total = 0;
        for (var i = 0; i < this.prKorpa.length; i++) {
            if (this.prKorpa[i].cena) {
                total += this.prKorpa[i].cena+skiper;
                this.totalPrice = total;
                this.idKorpe = this.prKorpa[i].id_korpe;
            }
        }

        return total;
    }

    getUkupno(){


        return this.getTotal();

    }


}
