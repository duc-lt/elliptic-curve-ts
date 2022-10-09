import { IntegerOperation as io } from './integer-operations';

const LEAST_2_DIGITS = 10;
const GREATEST_4_DIGITS = 9999;
export const PRIME_NUMBERS_2_TO_4_DIGITS = Array.from(
  { length: GREATEST_4_DIGITS - LEAST_2_DIGITS + 1 },
  (_, i) => LEAST_2_DIGITS + i,
).filter((num) => io.isPrime(num));
