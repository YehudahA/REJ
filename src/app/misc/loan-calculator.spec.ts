import { LoanCalculator } from './loan-calculator';

describe('LoanCalculator', () => {
  it('should create an instance', () => {
    expect(new LoanCalculator()).toBeTruthy();
  });

  it('test NPV func', () => {
    expect(-69).toEqual(Math.round(LoanCalculator.NPV([0,-100, 10, 10, 10], 0.05)));
  });
});
