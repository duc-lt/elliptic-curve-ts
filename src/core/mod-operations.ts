import { IntegerOperation as io } from './integer-operations';

export class ModularOperation {
  static inverse(a: number, mod: number) {
    // thuật toán Euclid mở rộng
    // https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
    if (io.isInt(a) && io.isInt(mod)) {
      if (io.gcd(a, mod) !== 1) {
        return;
      }

      let r0 = a,
        r1 = mod,
        s0 = 1,
        s1 = 0;
      let r2 = 1,
        s2 = 1;
      while (true) {
        const q = Math.floor(r0 / r1);
        r2 = io.modulo(r0, r1);
        if (r2 === 0) {
          return io.modulo(s2, mod);
        }

        s2 = s0 - q * s1;
        r0 = r1;
        r1 = r2;
        s0 = s1;
        s1 = s2;
      }
    }

    return;
  }

  static add(a: number, b: number, mod: number) {
    return io.modulo(a + b, mod);
  }

  static subtract(a: number, b: number, mod: number) {
    return io.modulo(a - b, mod);
  }

  static multiply(a: number, b: number, mod: number) {
    return io.modulo(a * b, mod);
  }

  static divide(a: number, b: number, mod: number) {
    return io.modulo(a * this.inverse(b, mod)!, mod);
  }

  static isSquare(n: number, mod: number) {
    // tiêu chuẩn Euler (Euler's criterion)
    // https://en.wikipedia.org/wiki/Euler%27s_criterion
    return (
      n !== 0 && io.isOddPrime(mod) && this.power(n, (mod - 1) / 2, mod) === 1
    );
  }

  static sqrt(n: number, mod: number) {
    // thuật toán Tonelli-Shanks
    // https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm
    if (!this.isSquare(n, mod) || io.gcd(n, mod) !== 1) {
      return;
    }

    let [q, s] = this.toBase2(mod - 1);
    let z = this.findLeastNonResidue(mod);
    let m = s,
      c = this.power(z, q, mod),
      t = this.power(n, q, mod),
      r = this.power(n, (q + 1) / 2, mod);
    if (t === 0) {
      return 0;
    }

    while (t !== 1) {
      let i = 1;
      while (this.power(t, Math.pow(2, i), mod) !== 1) {
        i++;
      }

      let b = this.power(c, Math.pow(2, m - i - 1), mod);
      m = i;
      c = this.power(b, 2, mod);
      t = this.multiply(t, c, mod);
      r = this.multiply(r, b, mod);
    }

    return r;
  }

  static power(base: number, exp: number, mod: number) {
    if (mod === 1) {
      return 0;
    }

    let result = 1;
    for (let i = 0; i < exp; i++) {
      result = this.multiply(result, base, mod);
    }
    return result;
  }

  private static toBase2(n: number) {
    // phân tích n về dạng n = q.2^s, với q lẻ
    let q = n,
      s = 0;
    while (q % 2 === 0) {
      q /= 2;
      s++;
    }

    return [q, s];
  }

  private static findLeastNonResidue(mod: number) {
    // tìm z nhỏ nhất sao cho z^((mod - 1) / 2) % mod = mod - 1
    let z = 2;
    while (this.power(z, (mod - 1) / 2, mod) !== mod - 1) {
      z++;
    }

    return z;
  }
}
