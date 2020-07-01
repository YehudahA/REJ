import { Component, Input } from '@angular/core';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'print-app',
  templateUrl: './print-app.component.html',
  styleUrls: ['./print-app.component.css']
})
export class PrintAppComponent {

  @Input() application: Application;
  
}
