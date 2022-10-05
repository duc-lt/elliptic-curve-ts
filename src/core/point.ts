export class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  assign(p: Point) {
    this.x = p.getX();
    this.y = p.getY();
    return this;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  equalsTo(p: Point) {
    return this.x === p.getX() && this.y === p.getY();
  }

  toString() {
    return this.equalsTo(POINT_AT_INFINITY)
      ? 'POINT AT INFINITY'
      : `(${this.x}, ${this.y})`;
  }
}

export const POINT_AT_INFINITY = new Point(Infinity, Infinity);
