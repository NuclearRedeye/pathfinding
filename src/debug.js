// Prints a 'maze' to the console.
function printMaze(maze) {
  for (const row of maze) {
    console.log(row.join(' '));
  }
}

// Prints a 'maze' to the console.
function cloneMaze(maze) {
  let retVal = [];
  for (const row of maze) {
    retVal.push(row.slice());
  }
  return retVal;
}

// Prints the 'maze' with the 'path' to the console.
export function printPath(maze, path) {
  const clone = cloneMaze(maze);
  for (const step of path) {
    clone[step.y][step.x] = 'x';
  }

  clone[path[0].y][path[0].x] = 's';
  clone[path[path.length - 1].y][path[path.length - 1].x] = 'e';
  printMaze(clone);
}

// Prints the 'maze' with the 'path' to the console.
export function printState(maze, openList, closedList) {
  const clone = cloneMaze(maze);
  for (const point of openList) {
    clone[point.y][point.x] = 'O';
  }

  for (const point of closedList) {
    clone[point.y][point.x] = 'C';
  }

  printMaze(clone);
}
