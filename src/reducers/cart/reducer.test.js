import {
  Record,
  Map as map,
} from 'immutable';

import reducer, { initialState } from './reducer';
import {
  TOGGLE_CART,
  CLOSE_CART,
  ADD_PRODUCT,
  SET_PACKAGES,
  ADD_PACKAGE,
} from './actions';

describe('Cart - Reducer', () => {
  describe('Initial state', () => {
    test('returns initial state by default', () => {
      const action = { type: '' };
      expect(reducer(undefined, action)).toEqual(initialState);
    })
  });

  describe('is open', () => {
    let state;

    beforeEach(() => {
      const CartRecord = Record({
        isOpen: true,
        items: map(),
        count: 0,
      });

      state = new CartRecord();
    });

    describe('TOOGLE_CART', () => {
      test('changes the isOpen property correctly', () => {
        const action = { type: TOGGLE_CART };
        expect(reducer(undefined, action).isOpen).toBeTruthy();
        expect(reducer(state, action).isOpen).toBeFalsy();
      })
    });

    describe('CLOSE_CART', () => {
      test('changes the isOpen property to false', () => {
        const action = { type: CLOSE_CART };
        expect(reducer(undefined, action).isOpen).toBeFalsy();
        expect(reducer(state, action).isOpen).toBeFalsy();
      })
    });
  });

  describe('ADD_PRODUCT', () => {
    let action;

    beforeEach(() => {
      action = {
        type: ADD_PRODUCT,
        payload: {
          item: {
            productId: '1',
            domain: 'miempresa.pe',
            prices: {
              Anual: { price: '100' }
            },
            selected: { period: 'Anual' },
          },
          category: 'domain',
        },
      };
    });

    test('add new product to cart', () => {
      const state = reducer(undefined, action);
      expect(state.items.get('item1')).not.toBeUndefined();

      action.payload = {
        item: {
          productId: '2',
          domain: 'miempresa.com',
          prices: {
            Anual: { price: '100' }
          },
          selected: { period: 'Anual' },
        },
        category: 'domain',
      };

      const newState = reducer(state, action);
      expect(newState.count).toEqual(2);
      expect(newState.items.get('item1')).not.toBeUndefined();
      expect(newState.items.get('item1').get('type')).toEqual('product');
      expect(newState.items.get('item1').get('category')).toEqual('domain');
      expect(newState.items.get('item2')).not.toBeUndefined();
      expect(newState.items.get('item2').get('category')).toEqual('domain');
    })

    test('add new product to cart', () => {
      const state = reducer(undefined, action);
      expect(state.items.get('item1')).not.toBeUndefined();
      expect(state.total).toEqual(100);

      action.payload = {
        item: {
          productId: '2',
          domain: 'miempresa.com',
          prices: {
            Anual: { price: '150' },
          },
          selected: { period: 'Anual' },
        },
        category: 'domain',
      };

      const newState = reducer(state, action);
      expect(newState.count).toEqual(2);
      expect(newState.items.get('item1')).not.toBeUndefined();
      expect(newState.items.get('item1').get('type')).toEqual('product');
      expect(newState.items.get('item1').get('category')).toEqual('domain');
      expect(newState.items.get('item2')).not.toBeUndefined();
      expect(newState.items.get('item2').get('category')).toEqual('domain');
      expect(newState.total).toEqual(250);
    })
  });

  describe('setPackages', () => {
    const action = {
      type: SET_PACKAGES,
      payload: {
        productId: '1',
        packages: [{
          remainingProducts: [{ id: '1' }, { id: '2' }],
        }],
      },
    };

    const CartRecord = Record({
      isOpen: false,
      items: map({
        1: map({ productId: '1', name: 'test' }),
      }),
      count: 1,
    });

    const state = new CartRecord();

    test('sets packages with the correct payload', () => {
      const newState = reducer(state, action);
      expect(newState.items.get('1').get('packages')).not.toBeUndefined();
    });
  });

  describe('ADD_PACKAGE', () => {
    const action = {
      type: ADD_PRODUCT,
      payload: {
        item: {
          productId: '1',
          domain: 'miempresa.pe',
          prices: {
            Anual: { price: '100' }
          },
          selected: { period: 'Anual' },
        },
        category: 'domain',
      },
    };

    test('add package to cart', () => {
      const state = reducer(undefined, action);
      expect(state.items.get('item1')).not.toBeUndefined();
      expect(state.items.size).toEqual(1);

      const newAction = {
        type: ADD_PACKAGE,
        payload: {
          item: 'item1',
          packageData: {
            id: '1',
            remainingProducts: [{
              productId: '2',
              domain: 'HOSTI 100',
            }],
          },
          product: {
            productId: '1',
            domain: 'miempresa.pe',
            prices: {
              Anual: { price: '100' }
            },
            selected: { period: 'Anual' },
          },
        },
      };

      const newState = reducer(state, newAction);
      expect(newState.count).toEqual(1);
      expect(newState.items.get('item1').get('type')).toEqual('package');
      expect(newState.items.get('item1').get('products').size).toEqual(2);
      expect(newState.items.size).toEqual(1);
    });
  });
});
