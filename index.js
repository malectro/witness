import {ctx} from './canvas';

function draw() {
  ctx.fillStyle = 'red';
  ctx.fillRect(100, 100, 100, 100);
  requestAnimationFrame(draw);
}

draw();

