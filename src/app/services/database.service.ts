import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from '../model/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable( {
    providedIn: 'root'
})
export class DatabaseService {
  apiUrl: string = environment.databaseServer + '/api/users/';

  constructor(private http: HttpClient) { }

  sendUserData(userData):Observable<User> {
    console.warn(userData);

    return this.http.put<User>(this.apiUrl, userData).pipe(
      catchError(error => error)
    );
  }

  private handleError(error: HttpErrorResponse) {
      console.log('error');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    //return throwError('Something bad happened; please try again later.');
  };
}