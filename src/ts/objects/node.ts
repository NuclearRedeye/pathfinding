import { Point } from '../types/point.js';

export class Node implements Point {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  sum(point: Point): void {
    this.x += point.x;
    this.y += point.y;
  }

  equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }
}
