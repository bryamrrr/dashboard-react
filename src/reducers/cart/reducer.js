import {
  CLOSE_CART,
  TOGGLE_CART,
} from './actions';

const cart = {
  isOpen: false,
};

function reducer(state = cart, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return Object.assign({}, state, { isOpen: !state.isOpen });
    case CLOSE_CART:
      return Object.assign({}, state, { isOpen: false });
    default:
      return state;
  }
}

export default reducer;
