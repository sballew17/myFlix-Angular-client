import { Injectable, OnInit } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const apiUrl = 'https://sam-superhero-movie-project.herokuapp.com/';

//User Registration
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService implements OnInit {
  /**
 *
 * @param http
 * @param router
 */
  constructor(private http: HttpClient, private router: Router) { }

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6WyI2MGJlYWY4ZGZiMTA5ZWJhNjY4YzcxZGIiLCI2MGJlYWY4ZGZiMTA5ZWJhNjY4YzcxZGIiXSwiX2lkIjoiNjBlY2NjYjUxYjYyN2MwMDE1MGQyM2RkIiwiVXNlcm5hbWUiOiJzYmFsbGV3IiwiUGFzc3dvcmQiOiIkMmIkMTAkamlzT3ZqMzBrMmFxTGQwdFFaRml6LkFOU3V3b2lFNUFBOXFtRmZCa1RIaTFhYVFkU0J5TzIiLCJFbWFpbCI6Im5ld2VtYWlsQG1haWwuY29tIiwiX192IjowLCJpYXQiOjE2MzAwMjE0OTcsImV4cCI6MTYzMDYyNjI5Nywic3ViIjoic2JhbGxldyJ9.OTu8I3rqz5mV5-qQ9sX5xZOHSoCRFzoda4WfoNpbFJc";
  
  ngOnInit() {

    throw new Error('Method not implemented.');
  }


  /**
 * API call to register new user account
 * @param userDetails
 * @returns
 */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Handles user login HTTP request
   * @param userDetails
   * @returns
   */
  //User Login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }
  /**
   * API call to fetch all movies in database
   * @returns
   */
  //Get All Movies
  getAllMovies(): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Get Director

  getDirector(): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    return this.http.get(apiUrl + 'director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }





  //Get Genre


  getGenre(): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );

  }


  getUser(user: any): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');

    return this.http
      .get(apiUrl + `users`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Adds user favorite movie
  addFavorite(id: string): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/Movies/${id}`, id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Deletes user favorite movies

  removeFavorite(id: string): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/Movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }




  // Edit user info



  EditUserInfo(userDetails: any): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const token = this.token;
    // localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }




  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  } private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

}
