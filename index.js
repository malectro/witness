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
  ctx.save();

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'yellow';
  ctx.arc(state.cursor.x, state.cursor.y, 20, 0, TWO_PI);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

draw();

