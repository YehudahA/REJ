import { Injectable } from '@angular/core';
import { Rent } from '../models/rent';
import { Inversion } from '../models/inversion';
import { AdditionalCost } from '../models/additional-cost';

@Injectable({
  providedIn: 'root'
})
export class DefaultsService {
  getDefaultInversion(){
    const inversion = new Inversion();
    
    inversion.propertyCost = 200000;

    inversion.financing = 150000;
    inversion.financingRate = 0.06;
    inversion.financingNPER = 20;

    inversion.investmentPeriod = 10;
    inversion.currentPropertyValue = 250000;
    inversion.propertyValueChange = 0.03;

    inversion.additionalCosts = new AdditionalCost(inversion);
    inversion.additionalCosts.financTaxes = 0.025;
    inversion.additionalCosts.appraisal = 400;
    inversion.additionalCosts.mortgageFees = 0.0175;
    inversion.additionalCosts.spainVAT = 1.21;
    inversion.additionalCosts.israelVAT = 1.17;
    inversion.additionalCosts.purchaseTax = 0.06;
    inversion.additionalCosts.diligensReports = 0.015;
    inversion.additionalCosts.notary = 0.01;
    inversion.additionalCosts.touristUsePermission = 2000;
    inversion.additionalCosts.lawyers = 0.005;
    inversion.additionalCosts.legal = 300;
    inversion.additionalCosts.REJFees = 0.05;
    inversion.additionalCosts.propertySize = 40;
    inversion.additionalCosts.renovationCostPerM = 400;
    inversion.additionalCosts.accesseories = 1000;
    inversion.additionalCosts.renovationManagement = 0.15;
    inversion.additionalCosts.unpredicted = 4000;

    inversion.rent = new Rent();
    inversion.rent.dailyRent = 70;
    inversion.rent.yearlyChange = 0.03;
    inversion.rent.occupancyPercentage = 0.8;
    inversion.rent.managementFees = 0.2;

    return inversion;
  }
}