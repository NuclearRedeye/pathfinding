import { Resolver } from '../types/resolver';
import { Point } from '../types/point';

function drawList(context: CanvasRenderingContext2D, list: Point[], colour: string): void {
  const w = 500 / 10;
  const h = 500 / 10;

  for (const point of list) {
    context.fillStyle = colour;
    context.fillRect(point.x * w, point.y * h, w, h);
  }
}

export function drawGraph(context: CanvasRenderingContext2D, resolver: Resolver): void {
  const w = 500 / 10;
  const h = 500 / 10;

  const graph = resolver.getGraph();
  for (let x = 0; x < graph.length; x++) {
    const row = graph[x];
    for (let y = 0; y < row.length; y++) {
      context.fillStyle = graph[y][x] === 0 ? 'white' : 'black';
      context.fillRect(x * w, y * h, w, h);
    }
  }
}

export function drawOpenList(context: CanvasRenderingContext2D, resolver: Resolver): void {
  drawList(context, resolver.getOpenList(), 'yellow');
}

export function drawClosedList(context: CanvasRenderingContext2D, resolver: Resolver): void {
  drawList(context, resolver.getClosedList(), 'blue');
}

export function drawPath(context: CanvasRenderingContext2D, resolver: Resolver): void {
  drawList(context, resolver.getPath(), 'green');
}

export function drawAll(context: CanvasRenderingContext2D, resolver: Resolver): void {
  drawGraph(context, resolver);
  drawOpenList(context, resolver);
  drawClosedList(context, resolver);
  drawPath(context, resolver);
}
