import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {Http, Response} from "@angular/http";
import {apiUrl, getAuthHeaders, prepareFormData, defaultPostHeaders, parseErrorToAlert} from "../constant";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  protected url = apiUrl;
   protected headers = defaultPostHeaders;
  constructor(protected http: Http) { }

  callService(item: Object): Observable<void>{

    let data = prepareFormData(item);
      console.log(data);
       this.headers = getAuthHeaders();
    return this.http.post(this.url, data, {headers: this.headers}).pipe(map(this.extractData)).pipe(catchError(this.handleError));


 }
  protected extractData(res: Response) {
    console.log(res['_body']);
    let obj = JSON.parse(res['_body']);

    return obj;
  }

  protected handleError (error: Response | any) {
    parseErrorToAlert(error);
    return Observable.throw("Error");
  }
}
