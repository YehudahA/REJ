import { LoanCalculator } from '../misc/loan-calculator';
import { AdditionalCost } from './additional-cost';
import { Rent } from './rent';
import { MathHelpers } from '../misc/math-helpers';

export class Inversion {
    propertyCost: number;
    financing: number;
    financingRate: number;
    financingNPER: number;

    currentPropertyValue: number;
    propertyValueChange: number;

    investmentPeriod: number;

    additionalCosts: AdditionalCost;
    rent: Rent;

    constructor() {
        this.additionalCosts = new AdditionalCost(this);
        this.additionalCosts.financTaxes = 0.025;
        this.additionalCosts.appraisal = 400;
        this.additionalCosts.mortgageFees = 0.0175;
        this.additionalCosts.spainVAT = 1.21;
        this.additionalCosts.israelVAT = 1.17;
        this.additionalCosts.purchaseTax = 0.06;
        this.additionalCosts.diligensReports = 0.015;
        this.additionalCosts.notary = 0.01;
        this.additionalCosts.touristUsePermission = 2000;
        this.additionalCosts.lawyers = 0.005;
        this.additionalCosts.legal = 300;
        this.additionalCosts.REJFees = 0.05;
        this.additionalCosts.propertySize = 40;
        this.additionalCosts.renovationCostPerM = 400;
        this.additionalCosts.accesseories = 1000;
        this.additionalCosts.renovationManagement = 0.15;
        this.additionalCosts.unpredicted = 4000;

        this.rent = new Rent();
        this.rent.dailyRent = 70;
        this.rent.yearlyChange = 0.03;
        this.rent.occupancyPercentage = 0.8;
        this.rent.managementFees = 0.2;
    }

    get totalCost() {
        return this.propertyCost + this.additionalCosts.total;
    }

    get capitalNeeded() {
        return this.totalCost - this.financing;
    }

    get PMT() {
        return LoanCalculator.PMT(this.financingRate / 12, this.financingNPER * 12, this.financing);
    }

    get financialExpenses() {
        return this.PMT * this.investmentPeriod * 12;
    }

    get totalRent() {
        const effectiveChange = MathHelpers.monthlyEffect(this.rent.yearlyChange);
        return MathHelpers.seriesSum(this.rent.monthlyIncome, 1 + effectiveChange, this.investmentPeriod * 12);
    }

    get totalCachflowIncome() {
        return this.totalRent + this.financialExpenses;
    }

    get futurePropertyValue() {
        return this.currentPropertyValue * Math.pow((1 + +this.propertyValueChange), this.investmentPeriod);
    }

    get loanExitBalance() {
        const fv = LoanCalculator.FV(this.financingRate / 12, this.investmentPeriod * 12, this.PMT, this.financing);
        return Math.min(fv, 0);
    }

    get totalExitBalance() {
        return this.futurePropertyValue + this.loanExitBalance;
    }

    get nominalGain() {
        return -this.capitalNeeded + this.totalCachflowIncome + this.totalExitBalance;
    }
}
