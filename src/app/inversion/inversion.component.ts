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
    this.inversion.propertyCost = 200000;
  
    this.inversion.financing = 150000;
    this.inversion.financingRate = 0.06;
    this.inversion.financingNPER = 20;

    this.inversion.investmentPeriod = 10;
    this.inversion.currentPropertyValue = 250000;
    this.inversion.propertyValueChange = 0.03;
  }

  ngOnInit() {
  }

}
