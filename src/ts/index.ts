import { Node } from './objects/node.js';
//import { default as Resolver } from './algorithms/frontier.js';
import { default as Resolver } from './algorithms/astar.js';
import { drawAll } from './utils/canvas-utils.js';
import { testMaze01 } from './mazes.js';

let pathFinder: Resolver;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

function onReset(): void {
  pathFinder = new Resolver(testMaze01, new Node(0, 0), new Node(9, 9));
  drawAll(context, pathFinder);
}

function onStep(): void {
  if (!pathFinder.isResolved()) {
    pathFinder.step();
    drawAll(context, pathFinder);
  }
}

function onAnimate(): void {
  const interval: NodeJS.Timeout = setInterval(() => {
    if (pathFinder.isResolved()) {
      clearInterval(interval);
    } else {
      pathFinder.step();
      drawAll(context, pathFinder);
    }
  }, 25);
}

function onResolve(): void {
  pathFinder.resolve();
  drawAll(context, pathFinder);
}

window.onload = function () {
  canvas = document.getElementById('view') as HTMLCanvasElement;
  context = canvas.getContext('2d') as CanvasRenderingContext2D;

  pathFinder = new Resolver(testMaze01, new Node(0, 0), new Node(9, 9));

  const buttonReset = document.getElementById('reset') as HTMLElement;
  buttonReset.addEventListener('click', onReset);

  const buttonStep = document.getElementById('step') as HTMLElement;
  buttonStep.addEventListener('click', onStep);

  const animateStep = document.getElementById('animate') as HTMLElement;
  animateStep.addEventListener('click', onAnimate);

  const buttonResolve = document.getElementById('resolve') as HTMLElement;
  buttonResolve.addEventListener('click', onResolve);

  drawAll(context, pathFinder);
};
