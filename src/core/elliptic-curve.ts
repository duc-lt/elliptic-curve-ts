import { isInt, modulo } from './integer-operations';
import { ModularOperation as _ } from './mod-operations';
import { Point, POINT_AT_INFINITY } from './point';

export default class EllipticCurve {
  // Non-singular elliptic curve:
  // y^2 = x^3 + ax + b (mod p), 4a^3 + 27b^2 != 0
  private a!: number;
  private b!: number;
  private p!: number;
  constructor(a: number, b: number, p: number) {
    if (this.isNonSingular() && p > 0) {
      this.a = a;
      this.b = b;
      this.p = p;
    }
  }

  isOnCurve(point: Point) {
    const x = point.getX(),
      y = point.getY();
    return (
      modulo(y * y, this.p) === modulo(x * x * x + this.a * x + this.b, this.p)
    );
  }

  private isNonSingular() {
    return 4 * this.a * this.a * this.a + 27 * this.b * this.b !== 0;
  }

  add(pA: Point, pB: Point) {
    if (this.isOnCurve(pA) && this.isOnCurve(pB)) {
      const xA = pA.getX(),
        yA = pA.getY(),
        xB = pB.getX(),
        yB = pB.getY();
      if ((pA.equalsTo(pB) && yA === 0) || (!pA.equalsTo(pB) && xA === xB)) {
        return POINT_AT_INFINITY;
      }

      let slope;
      if (pA.equalsTo(pB)) {
        slope = _.divide(3 * xA * xA + this.a, 2 * yA, this.p);
      } else {
        slope = _.divide(yB - yA, xB - xA, this.p);
      }
      const xAdd = modulo(slope * slope - xA - xB, this.p);
      const yAdd = modulo(slope * (xA - xAdd) - yA, this.p);
      return new Point(xAdd, yAdd);
    }

    if (pA.equalsTo(POINT_AT_INFINITY) && this.isOnCurve(pB)) {
      return pB;
    }

    if (pB.equalsTo(POINT_AT_INFINITY) && this.isOnCurve(pA)) {
      return pA;
    }
  }

  multiply(p: Point, k: number) {
    let prodPoint = new Point(p.getX(), p.getY());
    if (this.isOnCurve(p) && isInt(k) && k > 0) {
      for (let i = 1; i < k; i++) {
        prodPoint = prodPoint.assign(this.add(prodPoint, p)!);
      }
      return prodPoint;
    }

    return POINT_AT_INFINITY;
  }

  timesTable(p: Point) {
    let table = `Times table of P${p.toString()}:\n`;
    let k = 1;
    while (!this.multiply(p, k).equalsTo(POINT_AT_INFINITY)) {
      const prodPoint = this.multiply(p, k);
      table += `${k > 1 ? k : ''}P = ${prodPoint.toString()}\n`;
      k++;
    }

    table += `${k}P = ${POINT_AT_INFINITY.toString()}\n`;    
    return table;
  }

  toString() {
    return `y^2 = x^3 ${this.a > 0 ? '+' : '-'} ${Math.abs(this.a)}x ${
      this.b > 0 ? '+' : '-'
    } ${Math.abs(this.b)} (mod ${this.p})`;
  }
}
