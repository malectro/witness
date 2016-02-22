import store from './store';
import {moveCursor, startDrawing, finishDrawing} from './actions';


function handleMouseMove(event) {
  store.dispatch(moveCursor(event.clientX, event.clientY));
}

function handleClick(event) {
  let action;
  if (store.getState().drawing) {
    action = finishDrawing(event.clientX, event.clientY);
  } else {
    action = startDrawing(event.clientX, event.clientY);
  }
  store.dispatch(action);
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('click', handleClick);

