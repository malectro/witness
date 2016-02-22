import {TWO_PI} from './math';
import {ctx, canvas} from './canvas';
import store from './store';
import {initPuzzle} from './actions';
import {demoPuzzle, START_RADIUS, LINE_WIDTH} from './puzzle';
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


  // draw in puzzle space
  ctx.save();
  ctx.translate(state.offset.x, state.offset.y);

  ctx.fillStyle = 'gray';
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = LINE_WIDTH;
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
    if (start === state.progress.start) {
      ctx.fillStyle = 'yellow';
    } else {
      ctx.fillStyle = 'gray';
    }
    ctx.beginPath();
    ctx.arc(start.x, start.y, START_RADIUS, 0, TWO_PI);
    ctx.closePath();
    ctx.fill();
  }

  ctx.lineCap = 'round';
  for (let end of state.puzzle.ends) {
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x + LINE_WIDTH * 2, end.y);
    ctx.stroke();
  }

  ctx.restore();


  // draw the cursor
  if (state.drawing) {
    ctx.fillStyle = 'yellow';
  } else {
    ctx.fillStyle = 'white';
  }
  ctx.beginPath();
  ctx.arc(state.cursor.x, state.cursor.y, START_RADIUS, 0, TWO_PI);
  ctx.closePath();
  ctx.fill();
}

draw();

