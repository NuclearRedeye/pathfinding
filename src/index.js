import { findPath } from './astar.js';
import { printMaze, printPath } from './debug.js';

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

printPath(maze, findPath(maze, [0, 0], [9, 9]));

const testMaze01 = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];

console.assert(findPath(testMaze01, [0, 0], [3, 2]).length === 0);
console.assert(findPath(testMaze01, [0, 0], [0, 2]).length === 3);
