import _ from 'lodash';

import { SET_PRICES } from './actions';

export const initialState = {
  zones: {
    1: { id: 1, name: 'pe' },
    2: { id: 2, name: 'com.pe' },
    3: { id: 3, name: 'net' },
  },
  prices: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRICES:
      return Object.assign({}, state, {
        prices: _.mapKeys(action.payload, 'zone'),
      });
    default:
      return state;
  }
}

export default reducer;
