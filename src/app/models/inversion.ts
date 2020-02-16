import { LoanCalculator } from '../misc/loan-calculator';
import { AdditionalCost } from './additional-cost';
import { Rent } from './rent';
import { MathHelpers } from '../misc/math-helpers';
import { ArrayHelper } from '../misc/array-helper';
import { ChangeNotifier } from './change-notifier';
import { EventEmitter } from '@angular/core';
import { ICopyable } from './icopyable';
import { Settings } from './settings';

export class Inversion implements ChangeNotifier, ICopyable<Inversion> {

    constructor(private settings: Settings) { }

    changeEmitter = new EventEmitter<any>();
    emit() { this.changeEmitter.emit(null); }

    showTax: boolean;

    clientName: string;
    date: Date = new Date();
    propertyType: string;
    remarks: string;

    private _propertyCost: number;
    get propertyCost() { return this._propertyCost; }
    set propertyCost(val: number) {
        if (val != this._propertyCost) {
            this._propertyCost = val;
            this.emit();
        }
    }

    private _propertySize: number;
    get propertySize() { return this._propertySize; }
    set propertySize(val: number) {
        if (val != this._propertySize) {
            this._propertySize = val;
            this.emit();
        }
    }

    private _propertyAddress: string;
    get propertyAddress() { return this._propertyAddress; }
    set propertyAddress(val: string) {
        if (val != this._propertyAddress) {
            this._propertyAddress = val;
            this.emit();
        }
    }

    private _financing: number;
    get financing() { return this._financing; }
    set financing(val: number) {
        if (val != this._financing) {
            this._financing = val;
            this.emit();
        }
    }

    private _financingRate: number;
    get financingRate() { return this._financingRate; }
    set financingRate(val: number) {
        if (val != this._financingRate) {
            this._financingRate = val;
            this.emit();
        }
    }

    private _financingNPER: number;
    get financingNPER() { return this._financingNPER; }
    set financingNPER(val: number) {
        if (val != this._financingNPER) {
            this._financingNPER = val;
            this.emit();
        }
    }

    private _currentPropertyValue: number;
    get currentPropertyValue() { return this._currentPropertyValue; }
    set currentPropertyValue(val: number) {
        if (val != this._currentPropertyValue) {
            this._currentPropertyValue = val;
            this.emit();
        }
    }

    private _propertyValueChange1st: number;
    get propertyValueChange1st() { return this._propertyValueChange1st; }
    set propertyValueChange1st(val: number) {
        if (val != this._propertyValueChange1st) {
            this._propertyValueChange1st = val;
            this.emit();
        }
    }

    private _propertyValueChange1thPeriod: number;
    get propertyValueChange1thPeriod() { return this._propertyValueChange1thPeriod; }
    set propertyValueChange1thPeriod(val: number) {
        if (val != this._propertyValueChange1thPeriod) {
            this._propertyValueChange1thPeriod = val;
            this.emit();
        }
    }

    private _propertyValueChange2nd: number;
    get propertyValueChange2nd() { return this._propertyValueChange2nd; }
    set propertyValueChange2nd(val: number) {
        if (val != this._propertyValueChange2nd) {
            this._propertyValueChange2nd = val;
            this.emit();
        }
    }

    private _investmentPeriod: number;
    get investmentPeriod() { return this._investmentPeriod; }
    set investmentPeriod(val: number) {
        if (val != this._investmentPeriod) {
            this._investmentPeriod = val;
            this.emit();
        }
    }

    private _valueTax: number;
    get valueTax() { return this._valueTax; }
    set valueTax(val: number) {
        if (val != this._valueTax) {
            this._valueTax = val;
            this.emit();
        }
    }

    additionalCosts: AdditionalCost = new AdditionalCost(this, this.settings);
    rent: Rent = new Rent(this.settings);

    get totalCost() {
        return this.propertyCost + this.additionalCosts.total;
    }

    get selfCapital() {
        return this.totalCost - this.financing;
    }

    get PMT() {
        return LoanCalculator.PMT(this.financingRate / 12, this.financingNPER * 12, this.financing);
    }

    get financialExpenses() {
        return this.PMT * this.investmentPeriod * 12;
    }

    get totalRent() {
        const effectiveChange = MathHelpers.monthlyRate(this.rent.yearlyChange);
        return MathHelpers.seriesSum(this.rent.monthlyIncome, 1 + effectiveChange, this.investmentPeriod * 12);
    }

    get totalNetIncome() {
        return this.totalRent + this.financialExpenses;
    }

    get futurePropertyValue() {
        const valueAt1thPeriod = Math.pow(1 + this.propertyValueChange1st, this._propertyValueChange1thPeriod);
        const exitValue = Math.pow(1 + this.propertyValueChange2nd, this.investmentPeriod - this._propertyValueChange1thPeriod);
        return this.currentPropertyValue * valueAt1thPeriod * exitValue;
    }

    get loanExitBalance() {
        const fv = LoanCalculator.FV(this.financingRate / 12, this.investmentPeriod * 12, this.PMT, this.financing);
        return Math.min(fv, 0);
    }

    get totalExitBalance() {
        return this.futurePropertyValue + this.loanExitBalance - (this.showTax ? this.totalExitTax : 0);
    }

    get totalExitTax() {
        return (this.futurePropertyValue - this.totalCost) * this.valueTax;
    }

    get nominalGain() {
        return -this.selfCapital + this.totalNetIncome + this.totalExitBalance;
    }

    get IRR() {
        const values = this.cashFlowValues;
        const irr = LoanCalculator.IRR(values);
        const yearly = Math.pow(1 + irr, 12) - 1;
        return yearly;
    }

    get cashFlowValues() {
        const numbers = ArrayHelper.range(1, this.investmentPeriod * 12);

        const effectiveChange = 1 + MathHelpers.monthlyRate(this.rent.yearlyChange);
        const pmt = numbers.map(_ => this.PMT);
        const rent = numbers.map(i => this.rent.monthlyIncome * Math.pow(effectiveChange, i));

        const arr = [
            [-this.selfCapital],
            [0, ...pmt],
            [0, ...rent],
            [...numbers.map(_ => 0), this.totalExitBalance]
        ];

        const merged = ArrayHelper.merge(arr);
        return merged;
    }

    get yearlyCashFlowTable() {
        const effectiveChange = 1 + MathHelpers.monthlyRate(this.rent.yearlyChange);

        const table = ArrayHelper
            .range(1, this.investmentPeriod)
            .map(y => [
                y.toString(),
                MathHelpers.seriesSumFromOrgan(this.rent.monthlyIncome, effectiveChange, 12, (y - 1) * 12) / 12,
                -this.PMT
            ]);

        return table;
    }

    copyFrom(other: Inversion) {
        if (!other) return;

        this.clientName = other.clientName;
        this.date = other.date;
        this.propertyType = other.propertyType;
        this.remarks = other.remarks;

        this._propertyCost = other._propertyCost;
        this._propertySize = other._propertySize;
        this._propertyAddress = other._propertyAddress;

        this._financing = other._financing;
        this._financingRate = other._financingRate;
        this._financingNPER = other._financingNPER;
        this._currentPropertyValue = other._currentPropertyValue;
        this._propertyValueChange1st = other._propertyValueChange1st;
        this._propertyValueChange2nd = other._propertyValueChange2nd;
        this._propertyValueChange1thPeriod = other._propertyValueChange1thPeriod;
        this._investmentPeriod = other._investmentPeriod;

        this.rent.copyFrom(other.rent);
        this.additionalCosts.copyFrom(other.additionalCosts);
    }

    changePropertyCost(newValue: number) {
        const diff = this._propertyCost - newValue;

        if (diff) {
            this._propertyCost -= diff;
            this._financing -= diff;
            this.emit();
        }
    }
}
