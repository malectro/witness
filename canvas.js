import {resize} from './actions';
import store from './store';


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

Object.assign(canvas.style, {
  position: 'absolute',
  left: '0',
  top: '0',
  background: 'blue',
  cursor: 'none',
});

handleResize();
window.addEventListener('resize', handleResize);

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  store.dispatch(resize(canvas.width, canvas.height));
}

document.body.appendChild(canvas);

export {canvas, ctx};

