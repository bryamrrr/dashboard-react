import _ from 'lodash';

import {
  CLOSE_CART,
  TOGGLE_CART,
  ADD_PRODUCT,
  SET_PACKAGES,
} from './actions';

export const initialState = {
  isOpen: false,
  items: {},
  count: 0,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE_CART:
      return Object.assign({}, state, { isOpen: !state.isOpen });
    case CLOSE_CART:
      return Object.assign({}, state, { isOpen: false });
    case ADD_PRODUCT: {
      if (state.items[payload.productId]) return state; // TODO: Show toaster

      const newState = Object.assign({}, state);
      newState.items[payload.productId] = payload;
      newState.count += 1;
      return newState;
    }
    case SET_PACKAGES: {
      const newState = _.extend({}, state);
      newState.items[payload.productId].packages = payload.packages;
      return newState;
    }
    default:
      return initialState;
  }
}

export default reducer;
