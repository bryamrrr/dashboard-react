import { Map as map } from 'immutable';

import { SHOW_TOASTER } from './actions';

export const initialState = map({});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOASTER:
      return state.set(action.payload.id, {
        type: action.payload.type,
        message: action.payload.message,
        id: action.payload.id,
      });
    default:
      return state;
  }
}

export default reducer;
