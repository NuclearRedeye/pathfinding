import { Node } from './objects/node.js';
//import { default as Resolver } from './algorithms/frontier.js';
import { default as Resolver } from './algorithms/astar.js';
import { drawGraph, drawOpenList, drawClosedList, drawPath } from './utils/canvas-utils.js';
import { testMaze01 } from './mazes.js';

let pathFinder: Resolver;

function onStep(): void {
  if (!pathFinder.isResolved()) {
    pathFinder.step();
    draw();
  }
}

function onAnimate(): void {
  let interval: NodeJS.Timeout;
  interval = setInterval(() => {
    if (pathFinder.isResolved()) {
      clearInterval(interval);
    } else {
      pathFinder.step();
      draw();
    }
  }, 25);
}

function onResolve(): void {
  pathFinder.resolve();
  draw();
}

function draw() {
  const canvas: HTMLCanvasElement = document.getElementById('view') as HTMLCanvasElement;
  const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
  drawGraph(context, pathFinder);
  drawOpenList(context, pathFinder);
  drawClosedList(context, pathFinder);
  drawPath(context, pathFinder);
}

window.onload = function () {
  pathFinder = new Resolver(testMaze01, new Node(0, 0), new Node(9, 9));

  const buttonStep = document.getElementById('step') as HTMLElement;
  buttonStep.addEventListener('click', onStep);

  const animateStep = document.getElementById('animate') as HTMLElement;
  animateStep.addEventListener('click', onAnimate);

  const buttonResolve = document.getElementById('resolve') as HTMLElement;
  buttonResolve.addEventListener('click', onResolve);

  draw();
};
