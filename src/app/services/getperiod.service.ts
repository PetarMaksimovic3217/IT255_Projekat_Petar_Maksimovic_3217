import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map,share } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import {Http, Response} from "@angular/http";
import {apiUrl, getAuthHeaders} from "../constant";
import Period from "../model/period";
@Injectable({
  providedIn: 'root'
})
export class GetperiodService {
  protected url = apiUrl + "getPeriod.php";

    constructor (protected http: Http) {}

    getPeriod(): Observable<Period[]> {
        return this.http.get(this.url, {headers: getAuthHeaders() }).pipe(map(this.extractData))
    }


    protected extractData(res: Response) {
        let obj = JSON.parse(res['_body']);
        return obj.period;
    }
}
