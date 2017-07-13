import { Map as map } from 'immutable';

import _ from 'lodash';

import {
  SET_HOSTINGS,
  SET_HOSTING_PRICES,
} from './actions';

export const initialState = map({});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOSTINGS:
      return map(_.mapKeys(action.payload, 'id'));
    case SET_HOSTING_PRICES: {
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
