import * as frontier from './frontier.js';
import * as astar from './astar.js';

import { printMaze, printPath, printState } from './debug.js';
import { Point } from './point.js';

// Maze, where 0 represents empty space and 1 impassable terrain
const maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
];

// Using Frontier
printPath(maze, frontier.getPath(maze, new Point(0, 0), new Point(9, 9), printState));

// Use A *
printPath(maze, astar.getPath(maze, [0, 0], [9, 9]));

const testMaze01 = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];

console.assert(findPath(testMaze01, [0, 0], [3, 2]).length === 0);
console.assert(findPath(testMaze01, [0, 0], [0, 2]).length === 3);
