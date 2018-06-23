import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map,share } from 'rxjs/operators';
import {apiUrl, getAuthHeaders} from "../constant";
import Destinacija from "../model/destinacija";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetOneDestinationService {
  public url;
 public id: any;
    constructor (protected http: Http, private route: ActivatedRoute) {
      this.route = route;
    }




  
}
