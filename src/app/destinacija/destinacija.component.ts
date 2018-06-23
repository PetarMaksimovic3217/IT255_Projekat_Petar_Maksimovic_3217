import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map,share } from 'rxjs/operators';
import Destinacija from "../model/destinacija";
import {GetOneDestinationService} from "../services/get-one-destination.service";
import {GetBoatService} from "../services/get-boat.service";
import {KorpaService} from "../services/korpa.service";

@Component({
  selector: 'app-destinacija',
  templateUrl: './destinacija.component.html',
  styleUrls: ['./destinacija.component.scss']
})
export class DestinacijaComponent implements OnInit {
   http: Http;
   router: Router;
   destinacija : Destinacija[];
   public id:any;
   private data;
   constructor(route: ActivatedRoute, http: Http, router: Router,private getDestinacija: GetOneDestinationService,private getBrod: GetBoatService,private korpa:KorpaService) {
     if (localStorage.getItem('token') != null) {
         this.http = http;
         this.router = router;
         route.params.subscribe((params: Params) => {
         this.id = +params['id'];
      });
        //  alert("Uspešno ste loginovani");
      }
      else{
          router.navigateByUrl('/login');
        }
  }

  ngOnInit(){

            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append("token",localStorage.getItem("token"));
            this.http.get('http://localhost/projekat/getOneDestinacija.php?id='+this.id,{headers:headers}).pipe(map(this.extractData),share()).subscribe(data=>{
            this.destinacija = data;
            },err => {
            this.router.navigate(['./']);
            })
           this.loadBrod();


       }


protected extractData(res: Response) {
            let obj = JSON.parse(res['_body']);
            return obj.destinacija;
  }

  loadBrod() {
          var $:any;
          this.getBrod.getBrod().subscribe(data => {
              this.data = data.brodovi;

          });


      }
      dodajUKorpu(id: number) {
       //id = parseFloat(id.toString());
       console.log(id);
       this.korpa.addToCart(id, 1);
       this.router.navigateByUrl('/reservation');
   }

}
