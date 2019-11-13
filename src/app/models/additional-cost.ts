import { Inversion } from './inversion';
import { ChangeNotifier } from './change-notifier';
import { EventEmitter } from '@angular/core';
import { ICopyable } from './icopyable';

export class AdditionalCost implements ChangeNotifier, ICopyable<AdditionalCost> {

    constructor(private inversion: Inversion) { }

    changeEmitter = new EventEmitter<any>();
    emit() { this.changeEmitter.emit(null); }

    private _israelVAT: number;
    get israelVAT() { return this._israelVAT; }
    set israelVAT(val: number) {
        if (val != this._israelVAT) {
            this._israelVAT = val;
            this.emit();
        }
    }

    private _spainVAT: number;
    get spainVAT() { return this._spainVAT; }
    set spainVAT(val: number) {
        if (val != this._spainVAT) {
            this._spainVAT = val;
            this.emit();
        }
    }

    private _financTaxes: number;
    get financTaxes() { return this._financTaxes; }
    set financTaxes(val: number) {
        if (val != this._financTaxes) {
            this._financTaxes = val;
            this.emit();
        }
    }
    get financTaxesTotal() { return this.financTaxes * this.inversion.financing || 0; }

    private _appraisal: number;
    get appraisal() { return this._appraisal; }
    set appraisal(val: number) {
        if (val != this._appraisal) {
            this._appraisal = val;
            this.emit();
        }
    }
    get appraisalTotal() { return this.appraisal * this.spainVAT || 0; }

    private _mortgageFees: number;
    get mortgageFees() { return this._mortgageFees; }
    set mortgageFees(val: number) {
        if (val != this._mortgageFees) {
            this._mortgageFees = val;
            this.emit();
        }
    }
    get mortgageFeesTotal() { return Math.max(this.mortgageFees * this.spainVAT * this.inversion.financing, 1210) || 0; }

    private _purchaseTax: number;
    get purchaseTax() { return this._purchaseTax; }
    set purchaseTax(val: number) {
        if (val != this._purchaseTax) {
            this._purchaseTax = val;
            this.emit();
        }
    }
    get purchaseTaxTotal() { return this.purchaseTax * this.inversion.propertyCost || 0; }

    private _diligensReports: number;
    get diligensReports() { return this._diligensReports; }
    set diligensReports(val: number) {
        if (val != this._diligensReports) {
            this._diligensReports = val;
            this.emit();
        }
    }
    get diligensReportsTotal() { return this.diligensReports * this.inversion.propertyCost * this.spainVAT || 0; }

    private _notary: number;
    get notary() { return this._notary; }
    set notary(val: number) {
        if (val != this._notary) {
            this._notary = val;
            this.emit();
        }
    }
    get notaryTotal() { return this.notary * this.inversion.propertyCost * this.spainVAT || 0; }

    private _touristUsePermission: number;
    get touristUsePermission() { return this._touristUsePermission; }
    set touristUsePermission(val: number) {
        if (val != this._touristUsePermission) {
            this._touristUsePermission = val;
            this.emit();
        }
    }
    get touristUsePermissionTotal() { return this.touristUsePermission * this.spainVAT || 0; }

    private _lawyers: number;
    get lawyers() { return this._lawyers; }
    set lawyers(val: number) {
        if (val != this._lawyers) {
            this._lawyers = val;
            this.emit();
        }
    }
    get lawyersTotal() { return (this.lawyers * this.inversion.propertyCost * this.spainVAT || 0) + 300; }

    private _legal: number;
    get legal() { return this._legal; }
    set legal(val: number) {
        if (val != this._legal) {
            this._legal = val;
            this.emit();
        }
    }

    private _REJFees: number;
    get REJFees() { return this._REJFees; }
    set REJFees(val: number) {
        if (val != this._REJFees) {
            this._REJFees = val;
            this.emit();
        }
    }
    get REJFeesTotal() { return (this.REJFees * this.inversion.propertyCost * (this.israelVAT + this.spainVAT) / 2) || 0; }

    private _propertySize: number;
    get propertySize() { return this._propertySize; }
    set propertySize(val: number) {
        if (val != this._propertySize) {
            this._propertySize = val;
            this.emit();
        }
    }

    private _renovationCostPerM: number;
    get renovationCostPerM() { return this._renovationCostPerM; }
    set renovationCostPerM(val: number) {
        if (val != this._renovationCostPerM) {
            this._renovationCostPerM = val;
            this.emit();
        }
    }
    get renovationCostPropertyTotal() { return this.propertySize * this.renovationCostPerM || 0; }

    private _accesseories: number;
    get accesseories() { return this._accesseories; }
    set accesseories(val: number) {
        if (val != this._accesseories) {
            this._accesseories = val;
            this.emit();
        }
    }
    get accesseoriesTotal() { return this.accesseories * this.spainVAT || 0; }

    private _renovationManagement: number;
    get renovationManagement() { return this._renovationManagement; }
    set renovationManagement(val: number) {
        if (val != this._renovationManagement) {
            this._renovationManagement = val;
            this.emit();
        }
    }
    get renovationManagementTotal() {
        return Math.max((this.renovationCostPropertyTotal + this.accesseoriesTotal) * this.renovationManagement, 1600 * this.spainVAT) || 0;
    }

    private _unpredicted: number;
    get unpredicted() { return this._unpredicted; }
    set unpredicted(val: number) {
        if (val != this._unpredicted) {
            this._unpredicted = val;
            this.emit();
        }
    }

    get financTotal() {
        return this.financTaxesTotal +
            this.appraisalTotal +
            this.mortgageFeesTotal;
    }

    get additionalTotal() {
        return this.purchaseTaxTotal +
            this.diligensReportsTotal +
            this.notaryTotal +
            this.touristUsePermissionTotal +
            this.lawyersTotal +
            (this.legal || 0) +
            this.REJFeesTotal;
    }

    get renovationTotal() {
        return this.renovationCostPropertyTotal +
            this.accesseoriesTotal +
            this.renovationManagementTotal;
    }

    get total() {
        return this.financTotal +
            this.additionalTotal +
            this.renovationTotal +
            (this.unpredicted || 0);
    }

    copyFrom(other: AdditionalCost) {
        if (!other) return;
        
        this._financTaxes = other.financTaxes;
        this._appraisal = other.appraisal;
        this._mortgageFees = other.mortgageFees;
        this._spainVAT = other.spainVAT;
        this._israelVAT = other.israelVAT;
        this._purchaseTax = other.purchaseTax;
        this._diligensReports = other.diligensReports;
        this._notary = other.notary;
        this._touristUsePermission = other.touristUsePermission;
        this._lawyers = other.lawyers;
        this._legal = other.legal;
        this._REJFees = other.REJFees;
        this._propertySize = other.propertySize;
        this._renovationCostPerM = other.renovationCostPerM;
        this._accesseories = other.accesseories;
        this._renovationManagement = other.renovationManagement;
        this._unpredicted = other.unpredicted;
    }
}
