import store from './store';
import {moveCursor} from './actions';


function handleMouseMove(event) {
  store.dispatch(moveCursor(event.clientX, event.clientY));
}

window.addEventListener('mousemove', handleMouseMove);

