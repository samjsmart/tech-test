import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://agtd9u0rz6.execute-api.eu-west-2.amazonaws.com/prod';
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http     = http;
  }

  login(email: string, password: string, callback: (data: any) => void) {
    var headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http.post(this.baseUrl + '/login', {
      email:    email,
      password: password
    }, headers)
    .subscribe((data: any) => {
      callback(data);
    });
  }
}