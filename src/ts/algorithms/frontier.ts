import { Graph } from '../types/graph';
import { Node } from '../objects/node.js';
import { Point } from '../types/point';
import { Resolver } from '../types/resolver';

const neighbours = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];

class FrontierNode extends Node {
  public parent: FrontierNode | undefined;
  constructor(x: number = 0, y: number = 0, parent: FrontierNode | undefined = undefined) {
    super(x, y);
    this.parent = parent;
  }
}

export default class Frontier implements Resolver {
  private graph: Graph;
  private start: Point;
  private destination: Point;
  private openList: FrontierNode[];
  private closedList: FrontierNode[];
  private path: Node[];
  private steps: number;

  constructor(graph: Graph, start: Point, destination: Point) {
    this.graph = graph;
    this.start = start;
    this.destination = destination;
    this.openList = [new FrontierNode(start.x, start.y)];
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

  step(): void {
    // Pop a Node off the front of the open list.
    const currentNode: FrontierNode = this.openList.shift() as FrontierNode;

    // Is this node the destination? If yes then walk back through the closed list, and create a path.
    if (this.destination.equals(currentNode)) {
      let tmpNode: FrontierNode = currentNode;
      while (tmpNode !== undefined) {
        this.path.push(new Node(tmpNode.x, tmpNode.y));
        tmpNode = tmpNode.parent as FrontierNode;
      }
      this.path = this.path.reverse();
    }

    // Otherwise, itterate over this node's neighbours...
    for (const neighbour of neighbours) {
      const newNode = new FrontierNode(currentNode.x + neighbour[0], currentNode.y + neighbour[1], currentNode);

      // Make sure the new node is within the bounds.
      if (newNode.x < 0 || newNode.x >= this.graph[0].length || newNode.y < 0 || newNode.y >= this.graph.length) {
        continue;
      }

      // Make sure the new node is not marked as impassable, e.g. a wall...
      if (this.graph[newNode.y][newNode.x] !== 0) {
        continue;
      }

      // Make sure that we haven't already checked the new node, by seeing if it is already on the closed list.
      const isOnClosedList = this.closedList.find((point) => point.equals(newNode));
      if (isOnClosedList) {
        continue;
      }

      // Make sure that the target node is not already on the open list.
      const isOnOpenList = this.openList.find((point) => point.equals(newNode));
      if (isOnOpenList) {
        continue;
      }
      // Other wise add it to the open list, and move on to the next neighbour
      this.openList.push(newNode);
    }

    // Move the current node to the closed list...
    this.closedList.push(currentNode);

    // Increment the counter
    this.steps += 1;
  }

  resolve(): void {
    // Then, as long as there are Nodes on the open list...
    while (this.openList.length > 0 && this.path.length === 0) {
      this.step();
    }
  }
}
