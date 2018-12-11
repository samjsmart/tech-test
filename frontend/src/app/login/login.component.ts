import { Component }       from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService }      from '../api.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:      string;
  password:   string;
  notifier:   NotifierService;
  apiService: ApiService;

  constructor(notifierService: NotifierService, apiService: ApiService) {
    this.notifier   = notifierService;
    this.apiService = apiService;
  }

  onSignIn() {
    //Very basic email validation
    if(/^(.*)@(.*)\.(.*)/.test(this.email) != true) {
      this.notifier.notify('error', 'Invalid email address');
      return;
    }

    //Non empty password test
    if(!this.password) {
      this.notifier.notify('error', 'Empty password field');
      return;
    }
    
    this.apiService.login(this.email, this.password, (data, err) => {
      if(err)
        this.notifier.notify('error', 'An error has occurred, please try again');
      else
        console.log('Data: ', data);
    });
  }
}
