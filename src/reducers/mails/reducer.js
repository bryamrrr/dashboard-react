import { Map as map } from 'immutable';

import _ from 'lodash';

import {
  SET_MAILS,
  SET_MAIL_PRICES,
} from './actions';

export const initialState = map({});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAILS:
      return map(_.mapKeys(action.payload, 'id'));
    case SET_MAIL_PRICES: {
      const prices = _.mapKeys(action.payload, 'id');
      return state.map(product =>
        Object.assign({}, product, {
          prices: prices[product.id].prices,
        }),
      );
    }
    default:
      return state;
  }
}

export default reducer;
