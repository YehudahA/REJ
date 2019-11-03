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

}