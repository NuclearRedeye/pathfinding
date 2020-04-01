// Prints a 'maze' to the console.
export function printMaze(maze) {
  for (const row of maze) {
    console.log(row.join(' '));
  }
}

// Prints the 'maze' with the 'path' to the console.
export function printPath(maze, path) {
  const clone = maze.slice();
  for (const step of path) {
    clone[step[0]][step[1]] = 'x';
  }

  clone[path[0][0]][path[0][1]] = 's';
  clone[path[path.length - 1][0]][path[path.length - 1][1]] = 'e';
  printMaze(clone);
}
