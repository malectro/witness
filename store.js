/* @flow */

import {createStore} from 'redux';
import deepFreeze from 'deep-freeze';

import {distance} from './math';
import * as point from './point';
import sculpt from './sculpt';
import {INIT_PUZZLE, RESIZE, MOVE_CURSOR, START_DRAWING, FINISH_DRAWING} from './actions';
import {START_RADIUS} from './puzzle';

function createReducer(initialState: any, handlers: object): func {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


const initialState = deepFreeze({
  puzzle: {
    paths: [],
    starts: [],
    ends: [],
    min: point.point,
    max: point.point,
    size: point.size,
  },
  progress: {},
  offset: point.point,
  viewport: point.size,
  cursor: point.point,
  drawing: false,
});

const reducers = {
  [INIT_PUZZLE](state, action) {
    let min = {x: Infinity, y: Infinity};
    let max = {x: 0, y: 0};

    for (let path of action.puzzle.paths) {
      for (let point of path) {
        min.x = Math.min(point.x, min.x);
        min.y = Math.min(point.y, min.y);
        max.x = Math.max(point.x, max.x);
        max.y = Math.max(point.y, max.y);
      }
    }

    action.puzzle.min = min;
    action.puzzle.max = max;
    action.puzzle.size = {
      w: max.x - min.x,
      h: max.y - min.y,
    };

    return sculpt(state, {
      puzzle: {
        $set: deepFreeze(action.puzzle),
      },
    });
  },

  [RESIZE](state, action) {
    const {size} = state.puzzle;
    return sculpt(state, {
      $assign: {
        viewport: {
          w: action.w,
          h: action.h,
        },
        offset: {
          x: (action.w - size.w) / 2,
          y: (action.h - size.h) / 2,
        },
      },
    });
  },

  [MOVE_CURSOR](state, action) {
    return sculpt(state, {
      cursor: {
        $assign: {
          x: action.x,
          y: action.y,
        },
      },
    });
  },

  [START_DRAWING](state, action) {
    let start;
    for (let tryStart of state.puzzle.starts) {
      if (point.distance(tryStart, point.diff(action, state.offset)) < START_RADIUS) {
        start = tryStart;
      }
    }

    if (start) {
      state = sculpt(state, {
        drawing: {
          $set: true,
        },
        progress: {
          start: {
            $set: start,
          },
        },
      });
    }

    return state;
  },

  [FINISH_DRAWING](state, action) {
    return sculpt(state, {
      drawing: {
        $set: false,
      },
      progress: {
        start: {
          $set: null,
        },
      },
    });
  },
};

const reduce = createReducer(initialState, reducers);

export default createStore(reduce, initialState);

