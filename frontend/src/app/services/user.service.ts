import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {catchError, Observable, throwError} from "rxjs";
import {Weight} from "../models/weight.model";
import {GlobalService} from "./islogged.service";

const headers = new HttpHeaders().set('Content-Type', 'text');
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user/';



  constructor(private http: HttpClient, private router: Router, private globalSrv: GlobalService ) {}

  getByUserRole():  Observable<any>{
    return this.http.get(this.baseUrl+'displayuser', {responseType:'text', withCredentials: true})
      .pipe(catchError(err => this.handleError(err)));
  }

  getWeightHistory():  Observable<Weight[]>{
    return this.http.get<Weight[]>(this.baseUrl+'getweighthistory', {responseType:'json', withCredentials: true})
      .pipe(catchError(err => this.handleError(err)));

  }
  addWeight(weight:Weight):Observable<any>{
    return this.http.post(this.baseUrl+'postweight', weight, {withCredentials: true})
      .pipe(catchError(err => this.handleError(err)));
  }

  private handleError(httpError: HttpErrorResponse) {
    let message:string = '';
    console.log(httpError.status);
   if(httpError.status == HttpStatusCode.Unauthorized){
     console.log('Estoy en un error 401');
     this.router.navigateByUrl('/login');
     this.globalSrv.theItem=null;
     // localStorage.clear();

   }

    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event');
      message = "Network error";
    }
      // if (httpError.error instanceof ErrorEvent) {
      //   message = httpError.error.message;
      //   // A client-side or network error occurred. Handle it accordingly.
      //   console.error('An error occurred:', httpError.error.message);
    // }
    else {
      message = JSON.parse(httpError.error).message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later. Error Message- ' + message);
  }
}
