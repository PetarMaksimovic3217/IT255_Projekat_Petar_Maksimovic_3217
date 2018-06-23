import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {AdminServicesService} from "../services/admin-services.service";
import  User from "../model/user";
import {CategoryService} from "../services/category.service";
import Kategorija from "../model/kategorija";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-add-kategorija',
  templateUrl: './add-kategorija.component.html',
  styleUrls: ['./add-kategorija.component.scss']
})
export class AddKategorijaComponent implements OnInit {
  kategorija : Kategorija[];
   korisnik : User;
  public categoryForm = new FormGroup({
  naziv: new FormControl("",[Validators.required,Validators.minLength(4)])
});

constructor( private http: Http,private router: Router, private adminService: AdminServicesService, private categoryService: CategoryService) {
  if (localStorage.getItem('token') != null) {
        this.router.navigateByUrl('add-category');

      }
      else{
        this.router.navigateByUrl('login');
      }

  }
  addCategory(model: Kategorija) {
    console.log(model.naziv);
        this.adminService.callService(model).subscribe(data => {
           alert("Successfully added category");
           this.loadKategorije();
        },err => {
                alert(JSON.parse(err._body).error);
              });

    }
    ngOnInit(){

this.loadKategorije();

  }
  loadKategorije() {
        var $:any;
        this.categoryService.getKategorija().subscribe(data => {
            this.kategorija = data;

        });


    }
    remove(id:number){
  this.adminService.removeCategory(id);
     alert("Successfully deleted category");
    location.reload();



  }

}
