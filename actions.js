/* @flow */

/**
 * action types
 */

export const INIT_PUZZLE = 'INIT_PUZZLE';

export const RESIZE = 'RESIZE';

export const MOVE_CURSOR = 'MOVE_CURSOR';

export const START_DRAWING = 'START_DRAWING';
export const FINISH_DRAWING = 'FINISH_DRAWING';


/**
 * action creators
 */

export function initPuzzle(puzzle: Array): Object {
  return {
    type: INIT_PUZZLE,
    puzzle,
  };
}


export function resize(w: number, h: number): Object {
  return {
    type: RESIZE,
    w, h,
  };
}


export function moveCursor(x: number, y: number): Object {
  return {
    type: MOVE_CURSOR,
    x, y,
  };
}


export function startDrawing(x: number, y: number): Object {
  return {
    type: START_DRAWING,
    x, y,
  };
}

export function finishDrawing(x: number, y: number): Object {
  return {
    type: FINISH_DRAWING,
    x, y,
  };
}

