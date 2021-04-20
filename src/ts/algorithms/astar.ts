import { Graph } from '../types/graph';
import { Node } from '../objects/node.js';
import { Point } from '../types/point';
import { Resolver } from '../types/resolver';

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
class AStarNode extends Node {
  public parent: AStarNode | undefined;
  public f: number;
  public g: number;
  public h: number;

  constructor(x: number = 0, y: number = 0, parent: AStarNode | undefined = undefined) {
    super(x, y);
    this.parent = parent;
    this.f = 0; // Total 'cost' of the node.
    this.g = 0; // Distance, in steps, from the starting point.
    this.h = 0; // Estimated distance, in steps, from the destination.
  }
}

export default class AStar implements Resolver {
  private graph: Graph;
  private start: Point;
  private destination: Point;
  private openList: AStarNode[];
  private closedList: AStarNode[];
  private path: Node[];
  private steps: number;

  constructor(graph: Graph, start: Point, destination: Point) {
    this.graph = graph;
    this.start = start;
    this.destination = destination;
    this.openList = [new AStarNode(start.x, start.y)];
    this.closedList = [];
    this.path = [];
    this.steps = 0;
  }

  getSteps(): number {
    return this.steps;
  }

  getPath(): Node[] {
    return this.path;
  }

  getGraph(): Graph {
    return this.graph;
  }

  getOpenList(): Point[] {
    return this.openList;
  }

  getClosedList(): Point[] {
    return this.closedList;
  }

  isResolved(): boolean {
    return this.path.length > 0;
  }

  step() {
    let currentNode = this.openList[0];
    let currentIndex = 0;

    // 4.1 Get the current node
    for (let i = 0; i < this.openList.length; i++) {
      const node = this.openList[i];
      if (node.f < currentNode.f) {
        currentNode = node;
        currentIndex = i;
      }
    }

    // 4.2 Remove the node from the open list, and insert it into the closed list.
    this.openList.splice(currentIndex, 1);
    this.closedList.push(currentNode);

    // 4.3 See if we have found the goal
    if (currentNode.equals(this.destination)) {
      let current = currentNode;
      while (current) {
        this.path.push(current);
        current = current.parent as AStarNode;
      }
      this.path = this.path.reverse();
    }

    // 4.4 Generate nodes for the current node's neighbours.
    const nodeNeighbours = [];
    for (let newPosition of neighbours) {
      const neighbour = new AStarNode(currentNode.x + newPosition[0], currentNode.y + newPosition[1], currentNode);

      // 4.4.1 Ignore neighbours that are out of bounds.
      if (
        neighbour.x < 0 ||
        neighbour.x >= this.graph[0].length ||
        neighbour.y < 0 ||
        neighbour.y >= this.graph.length
      ) {
        continue;
      }

      // 4.4.2 Ignore nodes that are blocking terrain.
      if (this.graph[neighbour.y][neighbour.x] !== 0) {
        continue;
      }

      nodeNeighbours.push(neighbour);
    }

    // 4.5. Loop through neighours...
    for (const node of nodeNeighbours) {
      // 4.5.1 Is the node in the closed list?
      if (this.closedList.find((closedNode) => node.equals(closedNode))) {
        continue;
      }

      // 4.5.2 Calculate the values for f, g and h.
      node.g = currentNode.g + 1;
      node.h = (node.x - this.destination.x) ** 2 + (node.y - this.destination.y) ** 2;
      node.f = node.g + node.h;

      // 4.5.3 Child is already on the open list?
      const openListNode = this.openList.find((openNode) => node.equals(openNode));
      if (openListNode && node.g > openListNode.g) {
        continue;
      }

      // 4.5.4. Add the child to the open list.
      this.openList.push(node);
    }

    // 4.6. Sort Open List by so that lowest f is first.
    this.openList.sort((a, b) => a.g - b.g);

    this.steps += 1;
  }

  resolve(): void {
    // Then, as long as there are Nodes on the open list...
    while (this.openList.length > 0 && this.path.length === 0) {
      this.step();
    }
  }
}
