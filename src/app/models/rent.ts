
export class Rent {
    dailyRent: number;
    occupancyPercentage: number;
    managementFees: number;
    yearlyChange: number;

    get monthlyIncome() {
        return (this.dailyRent * this.occupancyPercentage * 365 * (1 - this.managementFees) / 12) - 200;
    }
}
