import { Component, Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-cassflow-chart',
  templateUrl: './cassflow-chart.component.html',
  styleUrls: ['./cassflow-chart.component.css']
})
export class CassflowChartComponent {
  private _data: any;

  @Input() set data(val: (string | number)[][]){
    this._data = val;
    this.buildChart();
  }
  
  public barChart: GoogleChartInterface = {
    chartType: 'Bar',
    dataTable: [],
    options: {
      chart: {
        title: 'Cash flow',
        subtitle: 'Finance Expenses vs Rent Income',
      },
      width: 600,
      height: 400
    }
  };

  buildChart() {
    this.barChart.dataTable = [
      ["Year", "Income", "Expenses"], ...this._data
    ];

    const chartComponent = this.barChart.component;
    if (chartComponent && chartComponent.wrapper) {
      chartComponent.draw();
    }
  }

}
