import { Path } from './path';
import { Graph } from './graph';
import { Point } from './point';

export interface Resolver {
  getSteps(): number;
  getPath(): Path;
  getGraph(): Graph;
  getOpenList(): Point[];
  getClosedList(): Point[];
  isResolved(): boolean;
  step(): void;
  resolve(): void;
}
