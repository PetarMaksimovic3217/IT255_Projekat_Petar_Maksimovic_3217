import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {Http, Response} from "@angular/http";
import {apiUrl, getAuthHeaders, prepareFormData, defaultPostHeaders, parseErrorToAlert} from "../constant";
import {PostService} from "./post.service";
@Injectable({
  providedIn: 'root'
})
export class SlikaService extends PostService {
  url = apiUrl + 'addSlika.php';
     urlremove = apiUrl + 'removeSlika.php';

    callService(item: Object) : Observable <void> {
      console.log(item);
         this.headers = getAuthHeaders();
         return super.callService(item);
  }

              removeSlika(id: number) {

                let data = "id=" + id;
                let headers = getAuthHeaders();
                this.http.post(this.urlremove, data, {headers: headers}).pipe(map(res => res)).subscribe(data => data);

            }
}
