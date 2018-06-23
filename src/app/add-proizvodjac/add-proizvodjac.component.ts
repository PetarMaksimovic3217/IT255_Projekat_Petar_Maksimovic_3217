import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {GetManufacturerService} from "../services/get-manufacturer.service";
import  User from "../model/user";
import {ManufacturerService} from "../services/manufacturer.service";
import Proizvodjac from "../model/proizvodjac";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-add-proizvodjac',
  templateUrl: './add-proizvodjac.component.html',
  styleUrls: ['./add-proizvodjac.component.scss']
})
export class AddProizvodjacComponent implements OnInit {
  Proizvodjac : Proizvodjac[];
   korisnik : User;
  public manufacturerForm = new FormGroup({
  naziv: new FormControl("",[Validators.required,Validators.minLength(4)])
});
  constructor(private http: Http,private router: Router, private proizvodjacService: ManufacturerService,private getProizvodjacService: GetManufacturerService) {
    if (localStorage.getItem('token') != null) {
          this.router.navigateByUrl('/add-manufacturer');
        //  alert("Uspešno ste loginovani");
        }
        else{
          this.router.navigateByUrl('login');
        }
      }
        addProizvodjac(model: Proizvodjac) {
          console.log(model.naziv);
              this.proizvodjacService.callService(model).subscribe(data => {
                 alert("Successfully added manufacturer");
                // this.loadKategorije();
              },err => {
                      alert(JSON.parse(err._body).error);
                    });

          }
          ngOnInit(){

     this.loadProizvodjac();

        }
        loadProizvodjac() {
              var $:any;

              this.getProizvodjacService.getProizvodjac().subscribe(data => {
                  this.Proizvodjac = data;

              });}



          remove(id : number){
        this.proizvodjacService.removeManufacturer(id);
           alert("Successfully deleted manufacturer");
          location.reload();



      }








































}
