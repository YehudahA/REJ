import { Injectable } from '@angular/core';
import { Rent, RentModel } from '../models/rent';
import { Inversion } from '../models/inversion';
import { AdditionalCost } from '../models/additional-cost';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class DefaultsService {
  getDefaultInversion() {
    const settings: Settings = {
      spainVat: 1.21,
      israelVat: 1.17
    };
    const inversion = new Inversion(settings);

    inversion.propertyCost = 200000;
    inversion.propertySize = 40;

    inversion.financing = 150000;
    inversion.financingRate = 0.06;
    inversion.financingNPER = 20;

    inversion.investmentPeriod = 10;
    inversion.currentPropertyValue = 250000;
    inversion.propertyValueChange = 0.03;

    inversion.additionalCosts = new AdditionalCost(inversion, settings);
    inversion.additionalCosts.financTaxes = 0.025;
    inversion.additionalCosts.appraisal = 400;
    inversion.additionalCosts.mortgageFees = 0.0175;
    inversion.additionalCosts.purchaseTax = 0.06;
    inversion.additionalCosts.diligensReports = 0.015;
    inversion.additionalCosts.notary = 0.01;
    inversion.additionalCosts.touristUsePermission = 2000;
    inversion.additionalCosts.lawyers = 0.005;
    inversion.additionalCosts.legal = 300;
    inversion.additionalCosts.REJFees = 0.05;
    inversion.additionalCosts.renovationCostPerM = 400;
    inversion.additionalCosts.accesseories = 1000;
    inversion.additionalCosts.renovationManagement = 0.15;
    inversion.additionalCosts.unpredicted = 4000;

    inversion.rent = new Rent(settings);
    inversion.rent.rentModel = RentModel.Daily;
    inversion.rent.rentPrice = 70;
    inversion.rent.yearlyChange = 0.03;
    inversion.rent.occupancyPercentage = 0.8;
    inversion.rent.managementFees = 0.2;
    inversion.rent.otherExpenses = 200;
    
    return inversion;
  }
}
