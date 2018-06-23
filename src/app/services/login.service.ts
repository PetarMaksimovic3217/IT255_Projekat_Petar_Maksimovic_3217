import { Injectable } from '@angular/core';
import {apiUrl} from "../constant";
import {PostService} from "./post.service";
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService extends PostService{
   url = apiUrl + 'loginservice.php';
}
