import { Component, Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-cashflow-chart',
  templateUrl: './cashflow-chart.component.html',
  styleUrls: ['./cashflow-chart.component.css']
})
export class cashflowChartComponent {
  private _data: any;

  barChart: GoogleChartInterface = {
    chartType: 'Bar',
    dataTable: [],
    options: {
      chart: {
        title: 'Cash flow',
        subtitle: 'Finance Expenses vs Rent Income',
      }
    }
  };

  @Input() set data(val: (string | number)[][]) {
    this._data = val;
    this.buildChart();
  }
  @Input() set width(val: number) {
    const opts = this.barChart.options as any;
    opts.width = val;
    opts.height = Math.round(val * 2 / 3);
  }

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
