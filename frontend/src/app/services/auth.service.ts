import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {catchError, map, Observable, throwError} from "rxjs";

//Falta cambiar algo aca

const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth/';


  constructor(private http: HttpClient, private router: Router) {}

  signup(user: User): Observable<any>{
    return this.http.post(this.baseUrl + 'singup', user, {headers, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  login(user: string, password: string){
    return this.http.post<any>(this.baseUrl + 'login',
      {userName: user, password:password}, {headers})
      .pipe(catchError(this.handleError),
        map(userData => {
          //Esto hay que cambiar con el tema de cookie
          sessionStorage.setItem("username", user);
          let tokenStr = "Bearer " + userData.token;
          console.log("Token---  " + tokenStr);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("roles", JSON.stringify(userData.roles));
          return userData;
        })
      );
  }

  private handleError(httpError: HttpErrorResponse) {
    let message:string = '';
    if (httpError.error instanceof ProgressEvent) {
      console.log('in progress event')
      message = "Network error";
    }
    else {
      message = httpError.error.message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(message);
  }
}
