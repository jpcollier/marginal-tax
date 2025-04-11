import { taxBrackets } from './taxBrackets';
import type { TaxBracket } from './taxBrackets';

interface TaxDetail {
  rate: number;
  incomeInBracket: number;
  taxInBracket: number;
  cumulativeTax: number;
}

interface TaxResult {
  totalTax: number;
  taxDetails: TaxDetail[];
}

export function calculateTax(income: number): TaxResult {
  if (income < 0) {
    throw new Error('Income cannot be negative');
  }
  
  let taxOwed = 0;
  const taxDetails: TaxDetail[] = [];

  for (const bracket of taxBrackets) {
    const taxableIncome = Math.min(income, bracket.upperLimit) - bracket.lowerLimit;
    let taxInBracket = 0;
    
    if (taxableIncome > 0) {
      // Convert to cents for precision, then back to dollars
      taxInBracket = Math.round(taxableIncome * bracket.rate * 100) / 100;
      taxOwed = Math.round((taxOwed + taxInBracket) * 100) / 100;
    }

    taxDetails.push({
      rate: bracket.rate,
      incomeInBracket: Math.max(0, taxableIncome),
      taxInBracket,
      cumulativeTax: taxOwed
    });
  }

  return { totalTax: taxOwed, taxDetails };
} 