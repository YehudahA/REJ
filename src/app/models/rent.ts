import { EventEmitter } from '@angular/core';
import { ChangeNotifier } from './change-notifier';
import { ICopyable } from './icopyable';
import { Settings } from './settings';

export class Rent implements ChangeNotifier, ICopyable<Rent> {
    constructor(private settings: Settings) { }

    changeEmitter = new EventEmitter<any>();
    emit() { this.changeEmitter.emit(null); }

    showTax: boolean;

    private _rentModel: RentModel = RentModel.Daily;
    get rentModel() { return this._rentModel; }
    set rentModel(val: RentModel) {
        if (val != this._rentModel) {
            this._rentModel = val;

            if (this._rentPrice) {
                this._rentPrice *= val == RentModel.Daily ? (1 / 30) : 30;
            }

            this.emit();
        }

    }

    private _rentPrice: number;
    get rentPrice() { return this._rentPrice; }
    set rentPrice(val:
        number) {
        if (val != this._rentPrice) {
            this._rentPrice = val;
            this.emit();
        }
    }

    private _occupancyPercentage: number;
    get occupancyPercentage() { return this._occupancyPercentage; }
    set occupancyPercentage(val: number) {
        if (val != this._occupancyPercentage) {
            this._occupancyPercentage = val;
            this.emit();
        }
    }

    private _managementFees: number;
    get managementFees() { return this._managementFees; }
    set managementFees(val: number) {
        if (val != this._managementFees) {
            this._managementFees = val;
            this.emit();
        }
    }

    private _yearlyChange: number;
    get yearlyChange() { return this._yearlyChange; }
    set yearlyChange(val: number) {
        if (val != this._yearlyChange) {
            this._yearlyChange = val;
            this.emit();
        }
    }

    private _monthlyExpenses: number;
    get monthlyExpenses() { return this._monthlyExpenses; }
    set monthlyExpenses(val: number) {
        if (val != this._monthlyExpenses) {
            this._monthlyExpenses = val;
            this.emit();
        }
    }

    private _yearlyExpenses: number;
    get yearlyExpenses() { return this._yearlyExpenses; }
    set yearlyExpenses(val: number) {
        if (val != this._yearlyExpenses) {
            this._yearlyExpenses = val;
            this.emit();
        }
    }

    private _incomeTax: number;
    get incomeTax() { return this._incomeTax; }
    set incomeTax(val: number) {
        if (val != this._incomeTax) {
            this._incomeTax = val;
            this.emit();
        }
    }

    private get effectiveRent() {
        let monthlyPrice
            = this.rentModel == RentModel.Monthly ?
                this.rentPrice :
                this.rentPrice * 365.25 / 12;

        monthlyPrice *= this.occupancyPercentage;

        if (this.incomeTax && this.showTax) {
            monthlyPrice *= (1 - this.incomeTax);
        }
        
        return monthlyPrice;
    }

    get monthlyIncome() {
        const monthlyRent = this.effectiveRent;

        const fees = monthlyRent * this._managementFees * this.settings.spainVat;
        return monthlyRent - fees - (this.monthlyExpenses || 0) - (this.yearlyExpenses / 12 || 0);
    }

    copyFrom(other: Rent) {
        if (!other) return;

        this._rentModel = other._rentModel;
        this._rentPrice = other._rentPrice;
        this._occupancyPercentage = other._occupancyPercentage;
        this._managementFees = other._managementFees;
        this._yearlyChange = other._yearlyChange;
        this._monthlyExpenses = other._monthlyExpenses;
        this._yearlyExpenses = other._yearlyExpenses;
        this._incomeTax = other._incomeTax;
    }
}

export enum RentModel {
    Daily = "Daily",
    Monthly = "Monthly"
}
