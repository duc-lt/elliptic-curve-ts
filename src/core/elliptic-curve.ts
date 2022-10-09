import { IntegerOperation as io } from './integer-operations';
import { ModularOperation as mo } from './mod-operations';
import { Point, POINT_AT_INFINITY } from './point';

// Đường cong elliptic modulo p không kỳ dị:
// y^2 = x^3 + ax + b (mod p), 4a^3 + 27b^2 != 0
export class EllipticCurve {
  private a!: number;
  private b!: number;
  private p!: number;
  private points: Point[] = [];
  constructor(a: number, b: number, p: number) {
    if (
      this.isNonSingular() &&
      io.isInt(a) &&
      io.isInt(b) &&
      io.isPositiveInt(p)
    ) {
      this.a = a;
      this.b = b;
      this.p = p;
      this.points = this.getPoints();
    }
  }

  getPoints() {
    const points: Point[] = [];
    for (let x = 0; x < this.p; x++) {
      let y: number;
      const xPart = x * x * x + this.a * x + this.b;
      if (mo.isSquare(xPart, this.p)) {
        y = mo.sqrt(xPart, this.p)!;
      } else {
        continue;
      }

      const p1 = new Point(x, y);
      if (p1.getY() !== 0) {
        const p2 = new Point(x, this.p - y);
        points.push(p2);
      }
      points.push(p1);
    }

    return points;
  }

  isOnCurve(point: Point) {
    const x = point.getX(),
      y = point.getY();
    return (
      io.modulo(y * y, this.p) ===
      io.modulo(x * x * x + this.a * x + this.b, this.p)
    );
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
        slope = mo.divide(3 * xA * xA + this.a, 2 * yA, this.p);
      } else {
        slope = mo.divide(yB - yA, xB - xA, this.p);
      }
      const xAdd = io.modulo(slope * slope - xA - xB, this.p);
      const yAdd = io.modulo(slope * (xA - xAdd) - yA, this.p);
      return new Point(xAdd, yAdd);
    }

    if (pA.equalsTo(POINT_AT_INFINITY) && this.isOnCurve(pB)) {
      return pB;
    }

    if (pB.equalsTo(POINT_AT_INFINITY) && this.isOnCurve(pA)) {
      return pA;
    }
  }

  double(p: Point) {
    return this.add(p, p);
  }

  multiply(p: Point, k: number) {
    let prodPoint = new Point(p.getX(), p.getY());
    if (this.isOnCurve(p) && io.isInt(k) && k > 0) {
      for (let i = 1; i < k; i++) {
        prodPoint = prodPoint.assign(this.add(prodPoint, p)!);
      }
      return prodPoint;
    }

    return POINT_AT_INFINITY;
  }

  getTimesTable(p: Point) {
    let k = 1;
    let table = `P(${p.getX()}, ${p.getY()}):\n`;
    while (!this.multiply(p, k).equalsTo(POINT_AT_INFINITY)) {
      const prodPoint = this.multiply(p, k);
      table += `  - ${k > 1 ? k : ''}P = ${prodPoint.toString()}\n`;
      k++;
    }

    table += `  - ${k}P = ${POINT_AT_INFINITY.toString()}\n`;
    return table;
  }

  getTimesTables() {
    let tables = `Times tables of ${this.toString()}\n`;
    const points = this.points;
    for (const p of points) {
      let k = 1;
      const index = points.indexOf(p);
      let table = `  P_${index}(${p.getX()}, ${p.getY()}):\n`;
      while (!this.multiply(p, k).equalsTo(POINT_AT_INFINITY)) {
        const prodPoint = this.multiply(p, k);
        table += `  - ${k > 1 ? k : ''}P_${index} = ${prodPoint.toString()}\n`;
        k++;
      }

      table += `  - ${k}P_${index} = ${POINT_AT_INFINITY.toString()}\n`;
      tables += `${table}\n`;
    }
    return tables;
  }

  toString() {
    return `y^2 = x^3 ${this.a > 0 ? '+' : '-'} ${
      Math.abs(this.a) !== 1 ? Math.abs(this.a) : ''
    }x ${this.b > 0 ? '+' : '-'} ${Math.abs(this.b)} (mod ${this.p})`;
  }

  countPoints() {
    return this.points.length + 1; // tính cả điểm vô cực - point at infinity
  }

  isPrimePointsCount() {
    return io.isPrime(this.countPoints());
  }

  private isNonSingular() {
    return 4 * this.a * this.a * this.a + 27 * this.b * this.b !== 0;
  }
}
