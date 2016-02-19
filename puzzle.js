import _ from 'lodash';
import sculpt from './sculpt';


export const LINE_VERTICAL = Symbol('line vertical');
export const LINE_HORIZONTAL = Symbol('line horizontal');
export const BLANK = Symbol('blank');
export const START = Symbol('start');
export const END = Symbol('end');


export const demoPuzzle = {
  squares: [
    [BLANK, BLANK],
    [BLANK, BLANK],
  ],
  segments: [
    [BLANK, BLANK, BLANK, BLANK, END],
    [BLANK, BLANK, BLANK],
    [BLANK, BLANK, BLANK, BLANK, BLANK],
    [BLANK, BLANK, BLANK],
    [START, BLANK, BLANK, BLANK, BLANK],
  ],
  paths: [
    [
      {x: 10, y: 10},
      {x: 200, y: 10},
    ],
  ],
  starts: [
    {x: 10, y: 10},
  ],
  ends: [
    {x: 200, y: 10},
  ],
};

export function genBlank(width, height) {
  let squares = Array(width);
  let segments = Array(width * 2 + 1);

  let blankCol = _.fill(Array(height), BLANK);
  let blankSegCol = _.fill(Array(height * 2 + 1), BLANK);

  _.fill(squares, blankCol);
  _.fill(segments, blankSegCol);

  return {squares, segments};
}

export function setSegment(puzzle, x, y, type) {
  return sculpt(puzzle, {
    [x]: {
      [y]: {
        $set: type,
      },
    },
  });
}

