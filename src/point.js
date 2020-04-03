export class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  sum(point) {
    this.x += point.x;
    this.y += point.y;
  }

  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
}
