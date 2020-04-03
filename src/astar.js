import { Point } from './point.js';

const neighbours = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
];

// Encapsultes a Node, that is used as part of the A* lookup
class Node extends Point {
  constructor(x, y, parent = undefined) {
    super(x, y);
    this.parent = parent;
    this.f = 0; // Total 'cost' of the node.
    this.g = 0; // Distance, in steps, from the starting point.
    this.h = 0; // Estimated distance, in steps, from the destination.
  }

  equals(node) {
    return this.x === node.x && this.y === node.y;
  }
}

// Returns a path, or an empty array if no path is possible between 'from' and 'to' in the supplied graph using the A*
// algorithm.
export function getPath(graph, from, to, debug) {
  let retVal = [];

  // 1. Create the start and end nodes.
  const startNode = new Node(from.x, from.y);
  const endNode = new Node(to.x, to.y);

  // 2. Create the open and closed lists.
  const openList = [];
  const closedList = [];

  // 3. Add the 'startNode' to the Open List
  openList.push(startNode);

  // 4. Now loop until we exhaust all options, or we find a path.
  while (openList.length > 0) {
    let currentNode = openList[0];
    let currentIndex = 0;

    // 4.1 Get the current node
    for (let i = 0; i < openList.length; i++) {
      const node = openList[i];
      if (node.f < currentNode.f) {
        currentNode = node;
        currentIndex = i;
      }
    }

    // 4.2 Remove the node from the open list, and insert it into the closed list.
    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    // 4.3 See if we have found the goal
    if (currentNode.equals(endNode)) {
      let current = currentNode;
      while (current) {
        retVal.push(current);
        current = current.parent;
      }
      retVal.reverse();
      break;
    }

    // 4.4 Generate nodes for the current node's neighbours.
    const nodeNeighbours = [];
    for (let newPosition of neighbours) {
      const neighbour = new Node(currentNode.x + newPosition[0], currentNode.y + newPosition[1], currentNode);

      // 4.4.1 Ignore neighbours that are out of bounds.
      if (neighbour.x < 0 || neighbour.x >= graph[0].length || neighbour.y < 0 || neighbour.y >= graph.length) {
        continue;
      }

      // 4.4.2 Ignore nodes that are blocking terrain.
      if (graph[neighbour.y][neighbour.x] !== 0) {
        continue;
      }

      nodeNeighbours.push(neighbour);
    }

    // 4.5. Loop through neighours...
    for (const node of nodeNeighbours) {
      // 4.5.1 Is the node in the closed list?
      if (closedList.find((closedNode) => node.equals(closedNode))) {
        continue;
      }

      // 4.5.2 Calculate the values for f, g and h.
      node.g = currentNode.g + 1;
      node.h = (node.x - endNode.x) ** 2 + (node.y - endNode.y) ** 2;
      node.f = node.g + node.h;

      // 4.5.3 Child is already on the open list?
      const openListNode = openList.find((openNode) => node.equals(openNode));
      if (openListNode && node.g > openListNode.g) {
        continue;
      }

      // 4.5.4. Add the child to the open list.
      openList.push(node);
    }

    // 4.6. Sort Open List by so that lowest f is first.
    openList.sort((a, b) => a.g - b.g);

    // If debugging is enabled, call it...
    if (debug) {
      debug(graph, openList, closedList);
    }
  }

  return retVal;
}
