import { Injectable } from '@angular/core';
import { map,share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {apiUrl} from "../constant";
import {PostService} from "./post.service";
@Injectable({
  providedIn: 'root'
})
export class RegisterService extends PostService {
  url = apiUrl + 'registerservice.php';

}
