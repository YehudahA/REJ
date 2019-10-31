import { Component, OnInit } from '@angular/core';
import { Inversion } from '../models/inversion';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent implements OnInit {
  inversion: Inversion = new Inversion();

  constructor() { 
    this.inversion.propertyCost = 120000;
    this.inversion.additionalCosts = 20000;
    this.inversion.financing = 100000;
    this.inversion.financingRate = 0.06;
    this.inversion.financingNPER = 20;

    this.inversion.rent = 700;

    this.inversion.investmentPeriod = 10;
    this.inversion.currentPropertyValue = 150000;
    this.inversion.propertyValueChange = 0.03;
  }

  ngOnInit() {
  }

}
