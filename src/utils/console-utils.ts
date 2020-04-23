/*
import { Path } from '../types/path';
import { Graph } from '../types/graph';
import { Point } from '../types/point';

// Prints a 'graph' to the console.
function printGraph(graph: Graph): void {
  for (const node of graph) {
    console.log(node.join(' '));
  }
}

// Creates a clone of the specified 'graph'.
function cloneGraph(graph: Graph): Graph {
  return [...graph];
}

// Prints the 'graph' with the 'path' to the console.
export function printPath(graph: Graph, path: Path) {
  const clone = cloneGraph(graph);
  for (const step of path) {
    clone[step.y][step.x] = 'x';
  }

  clone[path[0].y][path[0].x] = 's';
  clone[path[path.length - 1].y][path[path.length - 1].x] = 'e';
  printGraph(clone);
}

// Prints the 'maze' with the 'path' to the console.
export function printState(graph: Graph, openList: Point[], closedList: Point[]) {
  const clone = cloneGraph(graph);
  for (const point of openList) {
    clone[point.y][point.x] = 'O';
  }

  for (const point of closedList) {
    clone[point.y][point.x] = 'C';
  }

  printGraph(clone);
}
*/
