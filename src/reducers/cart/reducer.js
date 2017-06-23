import {
  CLOSE_CART,
  TOGGLE_CART,
  ADD_PRODUCT,
} from './actions';

const cart = {
  isOpen: false,
  items: {},
};

function reducer(state = cart, { type, payload }) {
  switch (type) {
    case TOGGLE_CART:
      return Object.assign({}, state, { isOpen: !state.isOpen });
    case CLOSE_CART:
      return Object.assign({}, state, { isOpen: false });
    case ADD_PRODUCT:
      if (state.items[payload.productId]) return state; // TODO: Show toaster

      return Object.assign({}, state, {
        items: { [payload.productId]: payload },
      });
    default:
      return state;
  }
}

export default reducer;
