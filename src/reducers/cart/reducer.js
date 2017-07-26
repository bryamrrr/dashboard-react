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

import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

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

  items.forEach(item => values.push(parseInt(item.selected.price, 10)));

  return values.reduce((accumulation, current) => accumulation + current, 0);
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return state.set('isOpen', !state.isOpen);
    case CLOSE_CART:
      return state.set('isOpen', false);
    case ADD_PRODUCT: {
      const productData = Object.assign({}, action.payload.item, {
        type: 'product',
        category: action.payload.category,
        fk_item_id: action.payload.item.id || action.payload.item.productId,
      });

      // Send product to API
      const url = `${constants.urls.API_CART}/carts/${state.id}/items`;
      httpRequest('POST', url, productData);

      const newState = state
        .setIn(['items', `item${state.count + 1}`], productData)
        .set('count', state.count + 1);

      return newState.set('total', calcTotal(newState.get('items')));
    }
    case SET_PACKAGES: {
      const item = Object.assign({}, state.get('items').get(action.payload.productId), {
        packages: _.mapKeys(action.payload.packages, 'id'),
      });
      return state
        .setIn([
          'items',
          action.payload.productId,
        ], item);
    }
    case ADD_PACKAGE: {
      const products = Object.assign({},
        _.mapKeys(action.payload.packageData.remainingProducts, (key) => {
          if (key.productId) return key.productId;
          return key.id;
        }),
      );

      const productId = state.items.get(action.payload.item).productId
        || state.items.get(action.payload.item).id;
      const product = {
        [productId]: state.items.get(action.payload.item),
      };

      const data = {
        period: action.payload.packageData.period,
        prices: action.payload.packageData.prices,
        selected: action.payload.packageData.prices[0],
        name: action.payload.packageData.name,
        type: 'package',
        products: Object.assign({}, products, product),
      };

      // Send package (product) to API
      const url = `${constants.urls.API_CART}/carts/${state.id}/items`;
      httpRequest('POST', url, data);

      const items = state.get('items')
        .delete(action.payload.item)
        .set(`package${state.count}`, data);

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
        count: 0,
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
