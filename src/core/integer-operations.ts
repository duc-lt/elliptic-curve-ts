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

export function isSquare(a: number) {
  if (isInt(a)) {
    return sqrt(a) * sqrt(a) === a;
  }

  return false;
}

export function sqrt(a: number) {
  return Math.floor(Math.sqrt(a));
}
