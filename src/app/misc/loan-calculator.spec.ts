import { LoanCalculator } from './loan-calculator';

describe('LoanCalculator', () => {
  it('test NPV func', () => {
    const npv = LoanCalculator.NPV([-100, 10, 10, 10], 0.05);
    expect(-69).toEqual(Math.round(npv));
  });

  it('test IRR func', () => {
    const irr = +(LoanCalculator.IRR([-100, 40, 40, 40]) * 100).toFixed(2);
    expect(9.70).toEqual(irr);
  });
});
