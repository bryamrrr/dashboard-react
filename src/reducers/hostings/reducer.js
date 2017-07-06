import {
  Record,
  Map as map,
} from 'immutable';

import _ from 'lodash';

import { SET_HOSTINGS } from './actions';

const HostingsRecord = Record({
  products: map(),
  prices: map(),
});

export const initialState = new HostingsRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOSTINGS:
      return state.set('products', map(_.mapKeys(action.payload, 'id')));
    default:
      return state;
  }
}

export default reducer;
