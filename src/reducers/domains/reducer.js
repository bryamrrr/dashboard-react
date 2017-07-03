import {
  fromJS,
  Record,
  Map as map,
} from 'immutable';

import _ from 'lodash';

import { SET_PRICES } from './actions';

const DomainsRecord = Record({
  zones: fromJS({
    1: { id: 1, name: 'pe' },
    2: { id: 2, name: 'com.pe' },
    3: { id: 3, name: 'net' },
  }),
  prices: map(),
});

export const initialState = new DomainsRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRICES:
      return state.set('prices', _.mapKeys(action.payload, 'zone'));
    default:
      return state;
  }
}

export default reducer;
