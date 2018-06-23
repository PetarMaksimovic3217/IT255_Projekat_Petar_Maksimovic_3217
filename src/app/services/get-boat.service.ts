import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,share } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import {Http, Response} from "@angular/http";
import {apiUrl, getAuthHeaders} from "../constant";
import ZaBrodove from "../model/zabrodove";
@Injectable({
  providedIn: 'root'
})
export class GetBoatService {
  protected url = apiUrl + "getBrodovi.php";

    constructor (protected http: Http) {}

    getBrod() {
        return this.http.get(this.url, {headers: getAuthHeaders() }).pipe(map(res => res.json()),share())
    }



}
