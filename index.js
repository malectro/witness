import {TWO_PI} from './math';
import {ctx, canvas} from './canvas';
import store from './store';
import {initPuzzle} from './actions';
import {demoPuzzle} from './puzzle';
import './controller';


store.dispatch(initPuzzle(demoPuzzle));

let lastState;
function draw() {
  const state = store.getState();

  if (state !== lastState) {
    lastState = state;
    drawState(state);
  }

  requestAnimationFrame(draw);
}

function drawState(state) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 10;
  for (let path of state.puzzle.paths) {
    ctx.beginPath();

    const {x, y} = path[0];
    ctx.moveTo(x, y);

    for (let i = 1; i < path.length; i++) {
      const {x, y} = path[i];
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  for (let start of state.puzzle.starts) {
    ctx.beginPath();
    ctx.arc(start.x, start.y, 20, 0, TWO_PI);
  }

  if (state.drawing) {
    ctx.fillStyle = 'yellow';
  } else {
    ctx.fillStyle = 'white';
  }
  ctx.beginPath();
  ctx.arc(state.cursor.x, state.cursor.y, 20, 0, TWO_PI);
  ctx.closePath();
  ctx.fill();
}

draw();

