import { LoanCalculator } from '../financ/loan-calculator';

export class Loan {
    pv: number;
    rate: number;
    nper: number;

    getPMT() {
        return LoanCalculator.PMT(this.rate / 12, this.nper * 12, this.pv);
    }
}
