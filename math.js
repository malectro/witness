
function vectorize(func) {
  return function (arg1) {
    return func(Array.isArray(arg1) ? arg1 : arguments);
  };
}


export const TWO_PI = Math.PI * 2;


export const sum = vectorize((series) => {
  let total = 0;
  for (let num of series) {
    total += num;
  }
  return total;
});

export const hypot = vectorize((dimensions) => {
  console.log(dimensions);
  let total = 0;
  for (let dimension of dimensions) {
    total += dimension * dimension;
  }
  return Math.sqrt(total);
});

export function distance(point1, point2) {
  return hypot(point1.x - point2.x, point1.y - point2.y);
}

