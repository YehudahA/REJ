
export class MathHelpers {
    static seriesSum(a1: number, q: number, n: number) {
        return a1 * (Math.pow(q, n) - 1) / (q - 1);
    }

    static monthlyEffect(nominalRate: number) {
        const effective = Math.pow((1 + nominalRate), 1 / 12) - 1;
        return effective;
    }
}