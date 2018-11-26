import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { HttpHeaders }   from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //TODO - This will be in a config file
  baseUrl:       string = 'https://agtd9u0rz6.execute-api.eu-west-2.amazonaws.com/prod';
  http:          HttpClient;
  cookieService: CookieService

  constructor(http: HttpClient, cookieService: CookieService) {
    this.http          = http;
    this.cookieService = cookieService
  }

  login(email: string, password: string, callback: (data: any) => void) {
    var headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    //TODO: async and error handle
    this.http.post(this.baseUrl + '/login', {
      email:    email,
      password: password
    }, headers)
    .subscribe((data: any) => {
      this.cookieService.set('authToken', data.token);
      callback(data);
    });
  }
}