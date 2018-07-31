import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cmonitorweb';

  ngOnInit() {
    if (environment.production) {
      window.console.log = function () { };   // disable any console.log debugging statements in production mode
      // window.console.error = function () { };
    }
  }
}
