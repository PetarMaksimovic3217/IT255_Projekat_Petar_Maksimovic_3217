import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {GetManufacturerService} from "../services/get-manufacturer.service";
import  User from "../model/user";
import Proizvodjac from "../model/proizvodjac";
import Model from "../model/model";
import {UserService} from "../services/user.service";
import {ModelService} from "../services/model.service";
import {GetModelService} from "../services/get-model.service";
@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {
  Model: Model[];
  Proizvodjac : Proizvodjac[];
   korisnik : User;
  public modelForm = new FormGroup({
  proizvodjac: new FormControl(),
  naziv: new FormControl("",[Validators.required,Validators.minLength(3)])
});
  constructor(private http: Http,private router: Router, private modelService: ModelService,private getProizvodjacService: GetManufacturerService,private getModel: GetModelService )
{    if (localStorage.getItem('token') != null) {
          this.router.navigateByUrl('add-model');

        }
        else{
          this.router.navigateByUrl('login');
        }
      }
      addModel(model: Model) {
        console.log(model.naziv);

          this.modelService.callService(model).subscribe(data=>{
               alert("Successfully added model");

               this.loadModel();
            },err => {
                    alert(JSON.parse(err._body).error);
                  });

        }
        ngOnInit(){

      this.loadProizvodjac();
      this.loadModel();

      }
      loadProizvodjac() {
            var $:any;

            this.getProizvodjacService.getProizvodjac().subscribe(data => {
                this.Proizvodjac = data;
                this.loadModel();

            });}

            loadModel() {
                  var $:any;

                  this.getModel.getModel().subscribe(data => {
                      this.Model = data;

                  });}

            remove(id : number){
          this.modelService.removeModel(id);
             alert("Successfully deleted model");
            location.reload();
          //   this.router.navigateByUrl("add-category");


        }
}
