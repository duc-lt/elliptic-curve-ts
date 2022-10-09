import { EllipticCurve, IntegerOperation as io } from './core';
import { PRIME_NUMBERS_2_TO_4_DIGITS } from './core';

const a = 1,
  b = 6;
// các giá trị p sao cho tổng số điểm
// trên đường cong elliptic là số nguyên tó
const primeEllipticCurve = [];

// tìm p để tổng số điểm trên đường cong elliptic là số nguyên tố
console.time('thời gian tìm p');
for (const p of PRIME_NUMBERS_2_TO_4_DIGITS.filter((num) => num < 100)) {
  const curve = new EllipticCurve(a, b, p);
  if (curve.isPrimePointsCount()) {
    primeEllipticCurve.push(p);
    console.log('p = ', p, 'số điểm = ', curve.countPoints());
  }
}
console.timeEnd('thời gian tìm p');

// bảng cửu chương của các điểm thuộc đường cong elliptic
// với p được chọn ngẫu nhiên trong mảng primeEllipticCurve
console.log('bảng cửu chương');
const randIndex = Math.floor(Math.random() * primeEllipticCurve.length);
const randp = primeEllipticCurve[randIndex];
const randCurve = new EllipticCurve(a, b, randp);
let pointIndex;
do {
  pointIndex = Math.floor(Math.random() * randCurve.countPoints())
} while (pointIndex === randCurve.countPoints() - 1) // điểm lấy ngẫu nhiên khác điểm vô cực
const point = randCurve.getPoints()[pointIndex];
console.time('thời gian liệt kê bảng cửu chương');
console.log(randCurve.getTimesTable(point));
console.timeEnd('thời gian liệt kê bảng cửu chương');
