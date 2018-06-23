import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map,share } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import {Http, Response} from "@angular/http";
import {apiUrl, getAuthHeaders} from "../constant";
import Slika from "../model/slika";
@Injectable({
  providedIn: 'root'
})
export class GetSlikaService {
  protected url = apiUrl + "getSlika.php";

    constructor (protected http: Http) {}

    getSlika(): Observable<Slika[]> {
        return this.http.get(this.url, {headers: getAuthHeaders() }).pipe(map(this.extractData))
    }


    protected extractData(res: Response) {
        let obj = JSON.parse(res['_body']);
        return obj.slika;
    }
}
