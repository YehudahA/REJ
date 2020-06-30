import { Component, OnInit } from '@angular/core';
import { Inversion } from '../models/inversion';
import { DataReaderService } from '../services/data-reader.service';
import { DefaultsService } from '../services/defaults.service';
import { MenuService } from '../services/menu.service';
import { RentModel } from '../models/rent';
import { Title } from '@angular/platform-browser';
import { ShowTaxService } from '../services/show-tax.service';
import { FileDownloaderService } from '../services/file-downloader.service';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent implements OnInit {

  private selectedCurrency = 1;
  inversion: Inversion;
  cashflowData: (string | number)[][];

  constructor(
    private titleService: Title,
    private fileDownloader: FileDownloaderService,
    fileReader: DataReaderService,
    showTaxService: ShowTaxService,
    defaultsService: DefaultsService,
    menuService: MenuService,
  ) {

    this.inversion = defaultsService.getDefaultInversion();

    showTaxService.showTax.subscribe(b => this.setShowTax(b));

    this.inversion.changeEmitter.subscribe(() => {
      this.buildChart();
      this.setTitle();
    });
    this.inversion.additionalCosts.changeEmitter.subscribe(() => this.buildChart());
    this.inversion.rent.changeEmitter.subscribe(() => this.buildChart());

    fileReader.inversionStream.subscribe(inversion => {
      if (inversion) {
        this.inversion.copyFrom(inversion);
        this.buildChart();
      }
    });

    menuService.save.subscribe(() => this.save());

    menuService.currencyChange.subscribe((v: number) => this.selectedCurrency = v);
  }

  setShowTax(b: boolean) {
    this.inversion.showTax = this.inversion.rent.showTax = b;
    this.buildChart();
  }

  ngOnInit() {
    this.setTitle();
    this.buildChart();
  }

  buildChart(){
    this.cashflowData = this.inversion.yearlyCashFlowTable;
  }
  
   save() {
    const copy = new Inversion(undefined);
    copy.copyFrom(this.inversion);
    delete copy.changeEmitter;
    delete copy.rent.changeEmitter;
    delete copy.additionalCosts.changeEmitter
    delete copy.additionalCosts["inversion"];

    this.fileDownloader.download(copy, (copy.clientName || 'inversoin') + ".rej");
  }

  get rentModelKeys() {
    return Object.values(RentModel);
  }

  get currency() {
    return this.selectedCurrency == 1 ? '&euro;' : '&#8362;';
  }

  setTitle() {
    this.titleService.setTitle(this.inversion.clientName || 'Investment Simulation');
  }
}
