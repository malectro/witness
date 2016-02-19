/* @flow */

import {createStore} from 'redux';
import deepFreeze from 'deep-freeze';

import {INIT_PUZZLE, MOVE_CURSOR} from './actions';
import sculpt from './sculpt';

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
  puzzle: [],
  cursor: {
    x: 0, y: 0,
  },
});

const reducers = {
  [INIT_PUZZLE](state, action) {
    return sculpt(state, {
      puzzle: {
        $set: deepFreeze(action.puzzle),
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
};

const reduce = createReducer(initialState, reducers);

export default createStore(reduce, initialState);

