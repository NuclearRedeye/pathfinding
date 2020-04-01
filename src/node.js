// Encapsultes a Node, that is used as part of the A* lookup
export class Node {
  constructor(x, y) {
    this.x = x; // Node's 'x' index.
    this.y = y; // Node's 'y' index.
    this.f = 0; // Total 'cost' of the node.
    this.g = 0; // Distance, in steps, from the starting point.
    this.h = 0; // Estimated distance, in steps, from the destination.
  }

  // Indexes of the neighbours of a node in relation to itself. This should ideally be handled by a graph but for this
  // simple experiment this will do.
  getNeighbours() {
    return [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
    ];
  }
}

// Compares 2 nodes returning true if they are the same
export function compareNode(a, b) {
  return a.x === b.x && a.y === b.y;
}
