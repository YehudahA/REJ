import { ArrayHelper } from './array-helper';

export class LoanCalculator {
    static PMT(ir: number, np: number, pv: number, fv?: number): number {
        /*
         * ir   - interest rate per month
         * np   - number of periods (months)
         * pv   - present value
         * fv   - future value
         * type - when the payments are due:
         *        0: end of the period, e.g. end of month (default)
         *        1: beginning of period
         */
        let pmt: number, pvif: number;

        fv || (fv = 0);

        if (ir === 0) return -(pv + fv) / np;

        pvif = Math.pow(1 + ir, np);
        pmt = (-ir * pv * (pvif + fv)) / (pvif - 1);

        return pmt;
    }

    static FV(rate: number, nper: number, pmt: number, pv: number) {
        const pow = Math.pow(1 + rate, nper);
        let fv: number;

        pv = pv || 0;

        if (rate) {
            fv = (pmt * (1 - pow) / rate) - pv * pow;
        } else {
            fv = -1 * (pv + pmt * nper);
        }
        return fv;
    }

    static NPV(values: number[], rate: number) {
        const r = rate + 1;

        const capitalized = values.map((val, ix) => val / Math.pow(r, ix + 1));
        const result = ArrayHelper.sum(capitalized);

        return result;
    }

    static IRR(values: number[], guess: number = 0.1) {
        let min = 0.0;
        let max = guess * 2;

        let npv: number;
        let rate: number;

        let count = 0;

        do {
            rate = (min + max) / 2;
            npv = LoanCalculator.NPV(values, rate);

            if (npv > 0) {
                min = rate;
            }
            else {
                max = rate;
            }

            count++;

            if (count > 50) {
                throw '#NUM!';
            }
        } while (Math.abs(npv) > 0.000001);
        return rate;
    }
}
