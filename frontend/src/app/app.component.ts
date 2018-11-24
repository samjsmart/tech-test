import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-test-frontend';
  displayHeader: boolean;

  constructor(location: Location) {
    this.displayHeader = /^(?!\/login)/.test(location.path());
  }
}
