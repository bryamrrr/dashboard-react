import {
  Record,
  Map as map,
  isImmutable,
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

  items.forEach(item => values.push(parseInt(item.get('selected').price, 10)));

  return values.reduce((accumulation, current) => accumulation + current, 0);
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return state.set('isOpen', !state.isOpen);
    case CLOSE_CART:
      return state.set('isOpen', false);
    case ADD_PRODUCT: {
      let productData;
      if (isImmutable(action.payload.item)) {
        productData = action.payload.item
          .set('type', 'product')
          .set('category', action.payload.category);
      } else {
        productData = map(Object.assign({}, action.payload.item, {
          type: 'product',
          category: action.payload.category,
        }));
      }

      const newState = state
        .setIn(['items', `item${state.count + 1}`], productData)
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
    case ADD_PACKAGE: {
      const products = map(Object.assign({},
        _.mapKeys(action.payload.packageData.remainingProducts, (key) => {
          if (key.productId) return key.productId;
          return key.id;
        }),
      )).map(product => map(product));

      const productId = state.items.get(action.payload.item).get('productId') || state.items.get(action.payload.item).get('id');
      const product = map({
        [productId]: state.items.get(action.payload.item),
      });

      const data = map({
        period: action.payload.packageData.period,
        prices: action.payload.packageData.prices,
        selected: action.payload.packageData.prices[0],
        name: action.payload.packageData.name,
        type: 'package',
        products: products.merge(product),
      });

      const items = state.get('items')
        .delete(action.payload.item)
        .set(`package${state.count}`, data);

      const newState = state.set('items', items);

      return newState.set('total', calcTotal(newState.get('items')));
    }
    case SELECT_PERIOD: {
      const newState = state.setIn(['items', action.payload.item, 'selected'], action.payload.selected);
      return newState.set('total', calcTotal(newState.get('items')));
    }
    case DELETE_ITEM: {
      const items = state.get('items').delete(action.payload);

      const newState = state.set('items', items);
      return newState.set('total', calcTotal(newState.get('items')));
    }
    default:
      return state;
  }
}

export default reducer;
