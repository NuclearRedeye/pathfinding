import { Point } from './point.js';

const neighbours = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];

class Node extends Point {
  constructor(x, y, parent = undefined) {
    super(x, y);
    this.parent = parent;
  }
}

export function getPath(graph, start, end, debug = undefined) {
  let retVal = []; // An array of Points, that represents the Path through the graph.
  const openList = []; // An array of Nodes that need to be checked.
  const closedList = []; // An array of Nodes that have been checked.

  // To get started, put the starting Point on the open list.
  openList.push(start);

  // Then, as long as there are Nodes on the open list...
  while (openList.length > 0) {
    // Pop a Node off the front of the open list.
    const currentNode = openList.shift();

    // Is this node the destination? If yes then walk back through the closed list, and create a path.
    if (end.equals(currentNode)) {
      let tmpNode = currentNode;
      while (tmpNode !== undefined) {
        retVal.push(tmpNode);
        tmpNode = tmpNode.parent;
      }
      retVal = retVal.reverse();
      break;
    }

    // Otherwise, itterate over this node's neighbours...
    for (const neighbour of neighbours) {
      const newNode = new Node(currentNode.x + neighbour[0], currentNode.y + neighbour[1], currentNode);

      // Make sure the new node is within the bounds.
      if (newNode.x < 0 || newNode.x >= graph[0].length || newNode.y < 0 || newNode.y >= graph.length) {
        continue;
      }

      // Make sure the new node is not marked as impassable, e.g. a wall...
      if (graph[newNode.y][newNode.x] !== 0) {
        continue;
      }

      // Make sure that we haven't already checked the new node, by seeing if it is already on the closed list.
      const alreadyChecked = closedList.find((point) => point.equals(newNode));
      if (alreadyChecked) {
        continue;
      }

      // Other wise add it to the open list, and move on to the next neighbour
      openList.push(newNode);
    }

    // Move the current node to the closed list...
    closedList.push(currentNode);

    // If debugging is enabled, call it...
    if (debug) {
      debug(graph, openList, closedList);
    }
  }

  // Return whatever path we got.
  return retVal;
}
