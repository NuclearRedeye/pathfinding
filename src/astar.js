import { Node, compareNode } from './node.js';

// Returns a path, or an empty array if no path is possible between 'from' and 'to' in the supplied graph using the A*
// algorithm.
export function findPath(graph, from, to) {
  let retVal = [];

  // 1. Create the start and end nodes.
  const startNode = new Node(from[0], from[1]);
  const endNode = new Node(to[0], to[1]);

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
    if (compareNode(currentNode, endNode)) {
      let current = currentNode;
      while (current) {
        retVal.push([current.x, current.y]);
        current = current.parent;
      }
      retVal.reverse();
      break;
    }

    // 4.4 Generate nodes for the current node's neighbours.
    const nodeNeighbours = [];
    for (let newPosition of currentNode.getNeighbours()) {
      const newNodeX = currentNode.x + newPosition[0];
      const newNodeY = currentNode.y + newPosition[1];

      // 4.4.1 Ignore neighbours that are out of bounds.
      if (newNodeX < 0 || newNodeX >= graph[0].length || newNodeY < 0 || newNodeY >= graph.length) {
        continue;
      }

      // 4.4.2 Ignore nodes that are blocking terrain.
      if (graph[newNodeY][newNodeX] !== 0) {
        continue;
      }

      const neighbour = new Node(newNodeX, newNodeY);
      neighbour.parent = currentNode;
      nodeNeighbours.push(neighbour);
    }

    // 4.5. Loop through neighours...
    for (const node of nodeNeighbours) {
      // 4.5.1 Is the node in the closed list?
      if (closedList.find((closedNode) => compareNode(closedNode, node))) {
        continue;
      }

      // 4.5.2 Calculate the values for f, g and h.
      node.g = currentNode.g + 1;
      node.h = (node.x - endNode.x) ** 2 + (node.y - endNode.y) ** 2;
      node.f = node.g + node.h;

      // 4.5.3 Child is already on the open list?
      const openListNode = openList.find((openNode) => compareNode(openNode, node));
      if (openListNode && node.g > openListNode.g) {
        continue;
      }

      // 4.5.4. Add the child to the open list.
      openList.push(node);
    }

    // 4.6. Sort Open List by so that lowest f is first.
    openList.sort((a, b) => a.g - b.g);
  }

  return retVal;
}
