import { Component, OnInit } from '@angular/core';
import { Inversion } from '../models/inversion';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { DataReaderService } from '../services/data-reader.service';
import { DefaultsService } from '../services/defaults.service';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent implements OnInit {

  inversion: Inversion;

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

  constructor(private fileReader: DataReaderService,defaultsService: DefaultsService) {
    this.inversion = defaultsService.getDefaultInversion();
    
    this.fileReader.inversionStream.subscribe(inversion=>{
      if(inversion){
          this.inversion.copyFrom(inversion);
          this.buildChart();
      }
    });
    
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
