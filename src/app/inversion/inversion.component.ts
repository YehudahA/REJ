import { Component, Input } from '@angular/core';
import { Inversion } from '../models/inversion';
import { Application } from '../models/application';
import { RentModel } from '../models/rent';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent {

  private _application: Application;

  @Input() set application(val: Application) {
    this._application = val;
    this.inversion = val.inversion;
    this.currency = val.currency;
  }
  get application() { return this._application; }

  inversion: Inversion;
  currency: string;

  get rentModelKeys() {
    return Object.values(RentModel);
  }

}