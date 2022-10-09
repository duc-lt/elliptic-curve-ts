export class IntegerOperation {
  static gcd(a: number, b: number): any {
    if (this.isInt(a) && this.isInt(b)) {
      if (b === 0) return a;
      return this.gcd(b, this.modulo(a, b));
    }
  }

  static isInt(a: number) {
    return Number.isInteger(a);
  }

  static isPositiveInt(a: number) {
    return this.isInt(a) && a > 0;
  }

  static modulo(a: number, b: number) {
    // hàm trả về số dư 0 <= r < b của phép chia a / b,
    // do phép % trong JS/TS có thể trả về số âm
    return ((a % b) + b) % b;
  }

  static isSquare(a: number) {
    if (this.isInt(a)) {
      return this.sqrt(a) * this.sqrt(a) === a;
    }

    return false;
  }

  static sqrt(a: number) {
    return Math.floor(Math.sqrt(a));
  }

  static isPrime(n: number) {
    if (this.isPositiveInt(n)) {
      if (n === 0 || n === 1) return false;
      if (n === 2 || n === 3) return true;
      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  static isOddPrime(n: number) {
    return this.isPrime(n) && n % 2 === 1;
  }
}
