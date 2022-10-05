export function gcd(a: number, b: number): any {
  if (isInt(a) && isInt(b)) {
    if (b === 0) return a;
    return gcd(b, modulo(a, b));
  }
}

export function isInt(a: number) {
  return Number.isInteger(a);
}

export function modulo(a: number, b: number) {
  return ((a % b) + b) % b;
}
