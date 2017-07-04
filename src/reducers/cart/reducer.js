import {
  Record,
  Map as map,
} from 'immutable';

import _ from 'lodash';

import {
  CLOSE_CART,
  TOGGLE_CART,
  ADD_PRODUCT,
  SET_PACKAGES,
} from './actions';

const CartRecord = Record({
  isOpen: false,
  items: map(),
  count: 0,
});

export const initialState = new CartRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return state.set('isOpen', !state.isOpen);
    case CLOSE_CART:
      return state.set('isOpen', false);
    case ADD_PRODUCT: {
      if (state.items.get(action.payload.item.productId)) return state; // TODO: Show toaster

      const productData = Object.assign({}, action.payload.item, {
        type: 'product',
        category: action.payload.category,
      });
      const newState = state
        .setIn(['items', action.payload.item.productId], map(productData))
        .set('count', state.count + 1);

      return newState;
    }
    case SET_PACKAGES:
      return state
        .setIn([
          'items',
          action.payload.productId,
          'packages',
        ], map(_.mapKeys(action.payload.packages, 'id')));
    default:
      return state;
  }
}

export default reducer;
