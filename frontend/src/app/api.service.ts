import { Injectable }        from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { HttpHeaders }       from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService }     from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //TODO - This will be in a config file
  baseUrl:       string = 'https://vuqzp0hcfi.execute-api.eu-west-2.amazonaws.com/prod';
  http:          HttpClient;
  cookieService: CookieService

  constructor(http: HttpClient, cookieService: CookieService) {
    this.http          = http;
    this.cookieService = cookieService
  }

  login(email: string, password: string, callback: (data: any, err: HttpErrorResponse) => void) {
    var headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    //Post request to API
    this.http.post<any>(this.baseUrl + '/login', {
      email:    email,
      password: password
    }, headers).subscribe(
    data => {
      //An error has happened
      if(!data) 
        return;

      //Set JWT cookie
      this.cookieService.set('authToken', data.token);

      //Invoke callback
      callback(data, null);
    },
    (err: HttpErrorResponse) => {
      //Something bad has happened, bubble the error up.
      callback(null, err);
    });
  }
}