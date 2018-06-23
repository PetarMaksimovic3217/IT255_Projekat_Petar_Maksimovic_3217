import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Http, Response} from "@angular/http";
import { map,share } from 'rxjs/operators';
import {apiUrl, getAuthHeaders, prepareFormData, defaultPostHeaders, parseErrorToAlert} from "../constant";
import Boat from "../model/boat";
@Injectable({
  providedIn: 'root'
})
export class KorpaService {
  protected urladd = apiUrl + 'korpaaddservice.php';
     protected urlremove = apiUrl + 'korparemoveservice.php';
     protected urlupdate = apiUrl + 'korpaupdateservice.php';
     protected urlcheckout = apiUrl + 'korpacheckoutservice.php';
     protected urlget = apiUrl + 'korpagetservice.php';
     protected urlgetReservation= apiUrl + 'getReservations.php';
  constructor(protected http: Http) { }

  addToCart(boat_id: number, dates: number) {
       let data = "id_broda=" + boat_id + "&period=" + dates;
       let headers = getAuthHeaders();
       this.http.post(this.urladd , data, {headers: headers}).pipe(map(res => res))
           .subscribe(data => {
               console.log(data)
           })
   }


   removeFromCart(boat_id: number) {
       let data = "id_broda=" + boat_id;
       let headers = getAuthHeaders();
       this.http.post(this.urlremove, data, {headers: headers})
           .pipe(map(res => res))
           .subscribe(data => data)
   }

   updateInCart(boat_id: number, dates: number) {
       let data = "id_broda=" + boat_id + "&period_id=" + dates;
       let headers = getAuthHeaders();
       this.http.post(this.urlupdate, data, {headers: headers})
           .pipe(map(res => res))
           .subscribe(data => data)
   }

   checkout() {
       let headers = getAuthHeaders();
       this.http.get(this.urlcheckout, {headers: headers})
           .pipe(map(res => res))
           .subscribe(data => data)
   }

   getCart(): Observable<Boat[]> {
       let headers = getAuthHeaders();
       return this.http.get(this.urlget, {headers: headers})
           .pipe(map((response: Response) => <Boat[]> response.json()));
   }
   getReservation(): Observable<Boat[]> {
       let headers = getAuthHeaders();
       return this.http.get(this.urlgetReservation, {headers: headers})
           .pipe(map((response: Response) => <Boat[]> response.json()));
   }


}
