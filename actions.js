/* @flow */

/**
 * action types
 */

export const INIT_PUZZLE = 'INIT_PUZZLE';

export const MOVE_CURSOR = 'MOVE_CURSOR';


/**
 * action creators
 */

export function initPuzzle(puzzle: Array): Object {
  return {
    type: INIT_PUZZLE,
    puzzle,
  };
}

export function moveCursor(x: number, y: number): void {
  return {
    type: MOVE_CURSOR,
    x, y,
  };
}

