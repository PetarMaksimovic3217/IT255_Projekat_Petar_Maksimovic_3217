import { Component, OnInit } from '@angular/core';
import ZaBrod from "../model/zabrodove";
import {GetBoatService} from "../services/get-boat.service";
import { Http,Headers } from '@angular/http';
import { Router} from '@angular/router';
import { map,share } from 'rxjs/operators';

@Component({
  selector: 'app-brod',
  templateUrl: './brod.component.html',
  styleUrls: ['./brod.component.scss']
})
export class BrodComponent implements OnInit {
boat: ZaBrod[];
isDone : boolean = false;
private data;
  constructor(private http: Http,private router: Router, private getBrod: GetBoatService) {
  /*  if (localStorage.getItem('token') != null) {
        this.router.navigateByUrl('/boats');
  }else{
    this.router.navigateByUrl('/login');
  }*/
}

  ngOnInit() {
 this.loadBrod();
  }
  loadBrod() {
          var $:any;
          this.getBrod.getBrod().subscribe(data => {
              this.data = data.brodovi;

          });


      }
}
