import { Component, Input } from '@angular/core';
import { Application } from '../models/application';
import { Title } from '@angular/platform-browser';
import { FileDownloaderService } from '../services/file-downloader.service';
import { DataReaderService } from '../services/data-reader.service';
import { ShowTaxService } from '../services/show-tax.service';
import { MenuService } from '../services/menu.service';
import { Inversion } from '../models/inversion';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';

@Component({
  selector: 'app-screen-app',
  templateUrl: './screen-app.component.html',
  styleUrls: ['./screen-app.component.css']
})
export class ScreenAppComponent {

  @Input() application: Application;

  constructor(
    private titleService: Title,
    private fileDownloader: FileDownloaderService,
    private fileReader: DataReaderService,
    private showTaxService: ShowTaxService,
    private dialog: MatDialog,
    menuService: MenuService,
  ) {
    fileReader.inversionStream.subscribe(inversion => {
      if (inversion) {
        this.application.inversion.copyFrom(inversion);
      }
    });

    menuService.save.subscribe(() => this.openSaveDialog());

    menuService.currencyChange.subscribe((v: number) => this.application.currency = this.getCurrency(v));
  }

  ngOnInit() {
    var inversion = this.application.inversion;

    inversion.changeEmitter.subscribe(() => {
      this.buildChart();
      this.setTitle();
    });

    inversion.additionalCosts.changeEmitter.subscribe(() => this.buildChart());
    inversion.rent.changeEmitter.subscribe(() => this.buildChart());

    this.fileReader.inversionStream.subscribe(inversion => {
      if (inversion) {
        inversion.copyFrom(inversion);
        this.buildChart();
      }
    });

    this.showTaxService.showTax.subscribe(b => this.setShowTax(b));

    this.setTitle();
    this.buildChart();
  }

  buildChart() {
    this.application.cashflowData = this.application.inversion.yearlyCashFlowTable;
  }

  setShowTax(b: boolean) {
    this.application.inversion.showTax = this.application.inversion.rent.showTax = b;
    this.buildChart();
  }

  openSaveDialog() {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: '250px',
      data: { fileName: this.application.inversion.clientName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });

  }

  save(fileName: string) {
    const copy = new Inversion(undefined);
    copy.copyFrom(this.application.inversion);
    delete copy.changeEmitter;
    delete copy.rent.changeEmitter;
    delete copy.additionalCosts.changeEmitter
    delete copy.additionalCosts["inversion"];

    this.fileDownloader.download(copy, (fileName || 'inversoin') + ".rej");
  }

  private getCurrency(code: number) {
    return code == 1 ? '&euro;' : '&#8362;';
  }

  setTitle() {
    this.titleService.setTitle(this.application.inversion.clientName || 'Investment Simulation');
  }
}
