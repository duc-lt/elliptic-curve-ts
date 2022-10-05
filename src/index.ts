import { ModularOperation as _ } from './core';
import EllipticCurve from './core/elliptic-curve';
import { Point } from './core/point';

const eCurve = new EllipticCurve(-5, 8, 37);
const p = new Point(6, 3);
console.log(eCurve.timesTable(p));
