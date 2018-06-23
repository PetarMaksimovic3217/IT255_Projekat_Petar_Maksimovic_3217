import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {GetSlikaService} from "../services/get-slika.service";
import {GetModelService} from "../services/get-model.service";
import {CategoryService} from "../services/category.service";
import {GetBoatService} from "../services/get-boat.service";
import {BoatService} from "../services/boat.service";
import  User from "../model/user";
import {GetDestinationService} from "../services/get-destination.service";
import Destinacija from "../model/destinacija";
import Kategorija from "../model/kategorija";
import Boat from "../model/boat";
import Model from "../model/model";
import Slika from "../model/slika";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-add-brod',
  templateUrl: './add-brod.component.html',
  styleUrls: ['./add-brod.component.scss']
})
export class AddBrodComponent implements OnInit {
  destinacija : Destinacija[];
  kategorija : Kategorija[];
  model : Model[];
  slika : Slika[];
  boat: Boat[];
   korisnik : User;
  public boatForm = new FormGroup({
  kategorija:new FormControl(),
  model: new FormControl(),
  predjeno_milja: new FormControl("",[Validators.required,Validators.minLength(1)]),
  boja: new FormControl("",[Validators.required,Validators.minLength(3)]),
  broj_putnika: new FormControl("",[Validators.required,Validators.minLength(1)]),
  registracija: new FormControl("",[Validators.required,Validators.minLength(8)]),
  destinacija : new FormControl(),
  slika_id:new FormControl(),
  cena:new FormControl("",[Validators.required,Validators.minLength(3)])
  });
  constructor(private http: Http,private router: Router, private getModel: GetModelService ,private getDestinacija: GetDestinationService, private getKategorija: CategoryService, private getSlika: GetSlikaService, private boatS: BoatService, private getBrod: GetBoatService) {
  if (localStorage.getItem('token') != null) {
        this.router.navigateByUrl('/add-boat');
      //  alert("Uspešno ste loginovani");
      }
      else{
        this.router.navigateByUrl('/login');
      }}
      addBrod(model: Boat) {
        console.log(model.registracija);
        this.boatS.callService(model).subscribe(data=>{
               alert("Succesfully added boat");

            },err => {
                    alert(JSON.parse(err._body).error);
                  });

        }
  ngOnInit() {
    this.loadModel();
    this.loadSlika();
    this.loadKategorije();
    this.loadDestinacije();
    //  this.loadBrod();
  }



    loadDestinacije() {
          var $:any;
          this.getDestinacija.getDestinacija().subscribe(data => {
              this.destinacija = data;

          });


      }

      loadKategorije() {
            var $:any;
            this.getKategorija.getKategorija().subscribe(data => {
                this.kategorija = data;

            });


        }

        loadModel() {
              var $:any;
              this.getModel.getModel().subscribe(data => {
                  this.model = data;

              });


          }

          loadSlika() {
                var $:any;
                this.getSlika.getSlika().subscribe(data => {
                    this.slika = data;

                });


            }


}
