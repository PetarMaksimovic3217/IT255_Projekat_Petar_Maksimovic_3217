import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {DestinationService} from "../services/destination.service";
import  User from "../model/user";
import {GetDestinationService} from "../services/get-destination.service";
import Destinacija from "../model/destinacija";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-add-destinacija',
  templateUrl: './add-destinacija.component.html',
  styleUrls: ['./add-destinacija.component.scss']
})
export class AddDestinacijaComponent implements OnInit {
  destinacija : Destinacija[];
   korisnik : User;
  public destinationForm = new FormGroup({
  ime: new FormControl("",[Validators.required,Validators.minLength(3)]),
  drzava: new FormControl("",[Validators.required,Validators.minLength(4)]),
    link: new FormControl("",[Validators.required,Validators.minLength(8)])
});
  constructor(private http: Http,private router: Router, private destinacijaS: DestinationService ,private getDestinacija: GetDestinationService) {
    if (localStorage.getItem('token') != null) {
          this.router.navigateByUrl('add-destinations');

        }
        else{
          this.router.navigateByUrl('login');
        }

    }
    addDestinacija(model: Destinacija) {
      console.log(model.ime);
      this.destinacijaS.callService(model).subscribe(data=>{
             alert("Successfully added destination");
             this.loadDestinacije();
          },err => {
                  alert(JSON.parse(err._body).error);
                });

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
      removeDestinacija(id:number){
    this.destinacijaS.removeDestinacija(id);
       alert("Successfully deleted destination");
      location.reload();



    }
}
