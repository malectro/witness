
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

Object.assign(canvas.style, {
  position: 'absolute',
  left: '0',
  top: '0',
  background: 'blue',
  cursor: 'none',
});

resize();
window.addEventListener('resize', resize);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

document.body.appendChild(canvas);

export {canvas, ctx};

