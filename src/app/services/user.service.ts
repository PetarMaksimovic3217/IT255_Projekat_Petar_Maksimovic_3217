import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import User from "../model/user";
import {SharedService} from "../services/shared.service";
import {apiUrl, getAuthHeaders} from "../constant";
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = apiUrl + 'userservice.php';

     constructor(private _http: Http) {
     }

     getUser(): Observable<User> {
         let headers = getAuthHeaders();
         return this._http.get(this.url , {headers: headers}).pipe(map((response: Response) => <User> response.json()));
     }

}
