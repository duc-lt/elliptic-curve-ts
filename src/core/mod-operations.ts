import { gcd, isInt, modulo } from './integer-operations';

export class ModularOperation {
  static inverse(a: number, mod: number) {
    if (isInt(a) && isInt(mod)) {
      if (gcd(a, mod) !== 1) {
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
        r2 = modulo(r0, r1);
        if (r2 === 0) {
          return s2 > 0 ? s2 : s2 + mod;
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
    return modulo(a + b, mod);
  }

  static subtract(a: number, b: number, mod: number) {
    return modulo(a - b, mod);
  }

  static multiply(a: number, b: number, mod: number) {
    return modulo(a * b, mod);
  }

  static divide(a: number, b: number, mod: number) {
    return modulo(a * this.inverse(b, mod)!, mod);
  }
}
