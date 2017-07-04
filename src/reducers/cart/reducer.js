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
  currencySymbol: 'S/',
  total: 0,
});

export const initialState = new CartRecord();

function calcTotal(items) {
  const values = [];


  items.forEach((item) => {
    const value = (item.get('type') === 'product')
      ? item.get('prices')[item.get('selected').period].price
      : item.get('total');

    values.push(value);
  });

  return values.reduce((accumulation, current) => accumulation + current);

  // return items.reduce((accumulation, current) => {
  //   console.log('accumulation', accumulation);
  //   console.log('current', current);
  //   const value = (current.get('type') === 'product')
  //     ? current.get('prices')[current.get('selected').period]
  //     : current.get('total');

  //   return accumulation + value;
  // });
}

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

      return newState.set('total', calcTotal(newState.get('items')));
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
