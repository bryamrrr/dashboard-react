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
  ADD_PACKAGE,
  DELETE_ITEM,
  SELECT_PERIOD,
  SET_CART,
} from './actions';

const CartRecord = Record({
  isOpen: false,
  items: map(),
  count: 0,
  currencySymbol: 'S/',
  total: 0,
  id: '',
});

export const initialState = new CartRecord();

function calcTotal(items) {
  const values = [];

  items.forEach(item => values.push(parseFloat(item.selected.price)));

  return values.reduce((accumulation, current) => accumulation + current, 0);
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return state.set('isOpen', !state.isOpen);
    case CLOSE_CART:
      return state.set('isOpen', false);
    case ADD_PRODUCT: {
      const newState = state
        .setIn(['items', action.payload.item.id], action.payload.item)
        .set('count', state.count + 1);

      return newState.set('total', calcTotal(newState.get('items')));
    }
    case SET_PACKAGES: {
      const item = Object.assign({}, state.get('items').get(action.payload.productId), {
        packages: _.mapKeys(action.payload.packages, 'slug'),
      });
      return state
        .setIn([
          'items',
          action.payload.productId,
        ], item);
    }
    case ADD_PACKAGE: {
      const items = state.get('items')
        .delete(action.payload.item)
        .set(action.payload.item, action.payload.packageData);

      const newState = state.set('items', items);

      return newState.set('total', calcTotal(newState.get('items')));
    }
    case SELECT_PERIOD: {
      const item = Object.assign({}, state.items.get('action.payload.item'), {
        selected: action.payload.selected,
      });
      const newState = state.setIn(['items', action.payload.item], item);
      return newState.set('total', calcTotal(newState.get('items')));
    }
    case DELETE_ITEM: {
      const items = state.get('items').delete(action.payload);

      const newState = state.set('items', items);
      return newState.set('total', calcTotal(newState.get('items')));
    }
    case SET_CART: {
      const items = (action.payload.items.length > 0)
        ? _.mapKeys(action.payload.items, 'id')
        : {};

      const cart = new CartRecord({
        isOpen: false,
        items: map(items),
        count: action.payload.items.length,
        currencySymbol: action.payload.currencySymbol || 'S/',
        total: 0,
        id: action.payload.id,
      });

      return cart.set('total', calcTotal(cart.items));
    }
    default:
      return state;
  }
}

export default reducer;
