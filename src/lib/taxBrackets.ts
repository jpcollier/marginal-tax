export interface TaxBracket {
  rate: number;
  lowerLimit: number;
  upperLimit: number;
}

export const taxBrackets: readonly TaxBracket[] = [
  { rate: 0.10, lowerLimit: 0, upperLimit: 11600 },
  { rate: 0.12, lowerLimit: 11601, upperLimit: 47150 },
  { rate: 0.22, lowerLimit: 47151, upperLimit: 100525 },
  { rate: 0.24, lowerLimit: 100526, upperLimit: 191950 },
  { rate: 0.32, lowerLimit: 191951, upperLimit: 243725 },
  { rate: 0.35, lowerLimit: 243726, upperLimit: 609350 },
  { rate: 0.37, lowerLimit: 609351, upperLimit: Infinity }
] as const; 