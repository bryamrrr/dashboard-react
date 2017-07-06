import {
  Record,
  Map as map,
} from 'immutable';

import _ from 'lodash';

import { SET_MAILS } from './actions';

const MailssRecord = Record({
  products: map(),
  prices: map(),
});

export const initialState = new MailssRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAILS:
      return state.set('products', map(_.mapKeys(action.payload, 'id')));
    default:
      return state;
  }
}

export default reducer;
