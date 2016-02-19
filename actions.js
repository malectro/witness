/* @flow */

/**
 * action types
 */

export const INIT_PUZZLE = 'INIT_PUZZLE';

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


export function moveCursor(x: number, y: number): Object {
  return {
    type: MOVE_CURSOR,
    x, y,
  };
}


export function startDrawing(): Object {
  return {
    type: START_DRAWING,
  };
}

export function finishDrawing(): Object {
  return {
    type: FINISH_DRAWING,
  };
}

