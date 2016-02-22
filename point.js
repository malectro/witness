import {hypot} from './math';

export const size = {
  w: 0,
  h: 0,
};

export const point = {
  x: 0,
  y: 0,
};

export const add = (p1, p2) => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
});

export const diff = (p1, p2) => ({
  x: p1.x - p2.x,
  y: p1.y - p2.y,
});

export const distance = (p1, p2) => (
  hypot(p1.x - p2.x, p1.y - p2.y)
);


const impose = fn => (
  function (p2) {
    return Point(fn(this, p2));
  }
);

export const Point = ({x, y}) => ({
  x, y,
  add: impose(add),
  diff: impose(diff),
  distance: impose(distance),
});

