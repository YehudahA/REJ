import { LoanCalculator } from '../financ/loan-calculator';

export class Inversion {
    propertyCost: number;
    additionalCosts: number;
    financing: number;
    financingRate: number;
    financingNPER: number;

    rent: number;

    currentPropertyValue: number;
    propertyValueChange: number;

    investmentPeriod: number;

    get totalCost(){
        return this.propertyCost + this.additionalCosts;
    }

    get capitalNeeded(){
            return this.totalCost - this.financing;
    }

    get PMT() {
        return LoanCalculator.PMT(this.financingRate / 12, this.financingNPER * 12, this.financing);
    }

    get financialExpenses() {
        return this.PMT * this.investmentPeriod * 12;
    }

    get totalRent() {
        return this.rent * 12 * this.investmentPeriod;
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

    get nominalGain(){
        return -this.capitalNeeded + this.totalCachflowIncome + this.totalExitBalance;
    }
}
