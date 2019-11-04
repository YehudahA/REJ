import { Inversion } from './inversion';

export class AdditionalCost {
    constructor(private inversion: Inversion) {

    }

    israelVAT: number;
    spainVAT: number;

    financTaxes: number;
    get financTaxesTotal() { return this.financTaxes * this.inversion.financing || 0; }

    appraisal: number;
    get appraisalTotal() { return this.appraisal * this.spainVAT || 0; }

    mortgageFees: number;
    get mortgageFeesTotal() { return Math.max(this.mortgageFees * this.spainVAT * this.inversion.financing, 1210) || 0; }

    purchaseTax: number;
    get purchaseTaxTotal() { return this.purchaseTax * this.inversion.propertyCost || 0; }

    diligensReports: number;
    get diligensReportsTotal() { return this.diligensReports * this.inversion.propertyCost * this.spainVAT || 0; }

    notary: number;
    get notaryTotal() { return this.notary * this.inversion.propertyCost * this.spainVAT || 0; }

    touristUsePermission: number;
    get touristUsePermissionTotal() { return this.touristUsePermission * this.spainVAT || 0; }

    lawyers: number;
    get lawyersTotal() { return (this.lawyers * this.inversion.propertyCost * this.spainVAT || 0) + 300; }

    legal: number;

    REJFees: number;
    get REJFeesTotal() { return (this.REJFees * this.inversion.propertyCost * (this.israelVAT + this.spainVAT) / 2) || 0; }

    propertySize: number;
    renovationCostPerM: number;
    get renovationCostPropertyTotal() { return this.propertySize * this.renovationCostPerM || 0; }

    accesseories: number;
    get accesseoriesTotal() { return this.accesseories * this.spainVAT || 0; }

    renovationManagement: number;
    get renovationManagementTotal() {
        return Math.max((this.renovationCostPropertyTotal + this.accesseoriesTotal) * this.renovationManagement, 1600 * this.spainVAT) || 0;
    }

    unpredicted: number;

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
}
