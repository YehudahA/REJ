import { Component } from '@angular/core';
import { Application } from './models/application';
import { DefaultsService } from './services/defaults.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  application: Application;

  constructor(defaultsService: DefaultsService) {
    const inversion = defaultsService.getDefaultInversion();

    this.application = {
      inversion,
      images: [],
      currency: undefined,
      cashflowData: []
    }
  }
}
