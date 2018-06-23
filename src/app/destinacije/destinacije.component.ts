import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {DestinationService} from "../services/destination.service";
import  User from "../model/user";
import {GetDestinationService} from "../services/get-destination.service";
import Destinacija from "../model/destinacija";
import {UserService} from "../services/user.service";
import {SearchDestinationPipe} from "../search-destination.pipe";
@Component({
  selector: 'app-destinacije',
  templateUrl: './destinacije.component.html',
  styleUrls: ['./destinacije.component.scss'],
  providers: [SearchDestinationPipe]
})
export class DestinacijeComponent implements OnInit {
  destinacija : Destinacija[];
  
  constructor(private http: Http,private router: Router, private destinacijaS: DestinationService ,private getDestinacija: GetDestinationService) {
  /*  if (localStorage.getItem('token') != null) {
          this.router.navigateByUrl('/destinations');
        //  alert("Uspešno ste loginovani");
        }
        else{
          this.router.navigateByUrl('/login');
        }*/
   }

   ngOnInit(){

this.loadDestinacije();

 }
 loadDestinacije() {
       var $:any;
       this.getDestinacija.getDestinacija().subscribe(data => {
           this.destinacija = data;

       });


   }
   public viewItem(item: Number){
         console.log(item);
         	this.router.navigate(['./destination',item])
         }
}
