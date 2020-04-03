import { Point } from './point.js';
import { printPath, printState } from './debug.js';

import * as frontier from './frontier.js';
import * as astar from './astar.js';

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
printPath(maze, astar.getPath(maze, new Point(0, 0), new Point(9, 9), printState));
