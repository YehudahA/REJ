export class ArrayHelper {
    static merge(args: number[][]): number[] {
        const length = Math.max(...args.map(arr => arr.length));

        const result: number[] = [];

        for (let i = 0; i < length; i++) {
            const values = args.map(arr => arr[i] || 0);
            result.push(ArrayHelper.sum(values));
        }

        return result;
    }

    static sum(values: number[]): number {
        return values.reduce((p, c) => p + c);
    }
}