import { Component, OnInit } from '@angular/core';
import { Inversion } from '../models/inversion';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { DataReaderService } from '../services/data-reader.service';
import { DefaultsService } from '../services/defaults.service';
import {saveAs } from 'file-saver';
import { MenuService } from '../services/menu.service';

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

  constructor(private fileReader: DataReaderService, defaultsService: DefaultsService, menuService: MenuService) {
    this.inversion = defaultsService.getDefaultInversion();

    this.fileReader.inversionStream.subscribe(inversion => {
      if (inversion) {
        this.inversion.copyFrom(inversion);
        this.buildChart();
      }
    });

    menuService.save.subscribe(()=>this.save());
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

  save() {
    const copy = new Inversion();
    copy.copyFrom(this.inversion);
    delete copy.changeEmitter;
    delete copy.rent.changeEmitter;
    delete copy.additionalCosts.changeEmitter
    delete copy.additionalCosts["inversion"];
    
    const blob = new Blob([JSON.stringify(copy)], { type: "text/json" });
    saveAs(blob, "inversion.REJ");
  }
}
