import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router} from '@angular/router';
import {AdminServicesService} from "../services/admin-services.service";
import  User from "../model/user";
import {SlikaService} from "../services/slika.service";
import {GetSlikaService} from "../services/get-slika.service";
import Slika from "../model/slika";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-add-slika',
  templateUrl: './add-slika.component.html',
  styleUrls: ['./add-slika.component.scss']
})
export class AddSlikaComponent implements OnInit {

  slika : Slika[];
   korisnik : User;
  public slikaForm = new FormGroup({
  link: new FormControl("",[Validators.required,Validators.minLength(8)])
});
  constructor( private http: Http,private router: Router, private slikaService: SlikaService, private getSlika: GetSlikaService) {
    if (localStorage.getItem('token') != null) {
          this.router.navigateByUrl('add-picture');

        }
        else{
          this.router.navigateByUrl('login');
        }
}
addSlika(model: Slika) {
  console.log(model.link);
      this.slikaService.callService(model).subscribe(data => {
         alert("Succesfully added picture");
         this.loadSlika();
      },err => {
              alert(JSON.parse(err._body).error);
            });

  }
  ngOnInit(){

this.loadSlika();

}
loadSlika() {
      var $:any;
      this.getSlika.getSlika().subscribe(data => {
          this.slika = data;

      });


  }
  remove(id:number){
this.slikaService.removeSlika(id);
   alert("Succesfully deleted picture");
  location.reload();
//   this.router.navigateByUrl("add-category");


}

}
