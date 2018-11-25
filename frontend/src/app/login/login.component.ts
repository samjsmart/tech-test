import { Component }       from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:    string;
  password: string;
  notifier: NotifierService;

  constructor( notifierService: NotifierService ) {
    this.notifier = notifierService;
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
    
    
  }
}
