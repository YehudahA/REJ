import { Component, OnInit } from '@angular/core';
import { Inversion } from '../models/inversion';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent implements OnInit {

  inversion: Inversion = new Inversion();

  public barChart: GoogleChartInterface = {
    chartType: 'Bar',
    dataTable: [],
    options: {
      chart: {
        title: 'Cash flow',
        subtitle: 'Finance Expenses vs Rent Income'
      }
    }
  };

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
    this.inversion.changeEmitter.subscribe(() => this.buildChart());
    this.inversion.additionalCosts.changeEmitter.subscribe(() => this.buildChart());
    this.inversion.rent.changeEmitter.subscribe(() => this.buildChart());

    this.buildChart();
  }

  buildChart() {
    this.barChart.dataTable = [
      ["Year", "Income", "Expences"], ...this.inversion.yearlyCashFlowTable
    ];

    if (this.barChart.component) {
      this.barChart.component.draw();
    }
  }

}
