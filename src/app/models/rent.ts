import { EventEmitter } from '@angular/core';
import { ChangeNotifier } from './change-notifier';

export class Rent  implements ChangeNotifier {
    changeEmitter = new EventEmitter<any>();
    emit() { this.changeEmitter.emit(null); }

    private _dailyRent: number;
    get dailyRent() { return this._dailyRent; }
    set dailyRent(val: number) {
        if (val != this._dailyRent) {
            this._dailyRent = val;
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

    get monthlyIncome() {
        return (this.dailyRent * this.occupancyPercentage * 365 * (1 - this.managementFees) / 12) - 200;
    }
}
