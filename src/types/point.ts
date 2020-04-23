export interface Point {
  x: number;
  y: number;
  sum(point: Point): void;
  equals(point: Point): boolean;
}

export class Point implements Point {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  sum(point: Point) {
    this.x += point.x;
    this.y += point.y;
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }
}
