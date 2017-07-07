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
  DELETE_ITEM,
  SELECT_PERIOD,
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
            selected: { period: 'Anual', price: 100 },
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
          selected: { period: 'Anual', price: 100 },
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
          selected: { period: 'Anual', price: 150 },
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
          selected: { period: 'Anual', price: 100 },
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
            prices: [{ period: 'Anual', price: 100 }],
          },
        },
      };

      const newState = reducer(state, newAction);
      expect(newState.count).toEqual(1);
      expect(newState.items.get('package1').get('type')).toEqual('package');
      expect(newState.items.get('package1').get('products').size).toEqual(2);
      expect(newState.items.size).toEqual(1);
    });
  });

  describe('DELETE_ITEM', () => {
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

    test('delete an item from cart', () => {
      const state = reducer(undefined, action);
      expect(state.items.get('item1')).not.toBeUndefined();
      expect(state.items.size).toEqual(1);

      const deleteAction = {
        type: DELETE_ITEM,
        payload: 'item1',
      };

      const newState = reducer(state, deleteAction);
      expect(newState.count).toEqual(1); // Doesnt change
      expect(newState.items.get('item1')).toBeUndefined();
      expect(newState.items.size).toEqual(0);
    });
  });

  describe('SELECT_PERIOD', () => {
    const action = {
      type: ADD_PRODUCT,
      payload: {
        item: {
          productId: '1',
          domain: 'miempresa.pe',
          selected: { period: 'Anual', price: 100 },
        },
        category: 'domain',
      },
    };

    test('delete an item from cart', () => {
      const state = reducer(undefined, action);
      expect(state.total).toEqual(100);

      const selectAction = {
        type: SELECT_PERIOD,
        payload: {
          item: 'item1',
          selected: {
            currencySymbol: 'S/',
            period: '2 Años',
            periodId: 'c181f276-09cc-41d6-a6d9-52dc357a2689',
            price: 193,
          },
        },
      };

      const newState = reducer(state, selectAction);
      expect(newState.count).toEqual(1); // Doesnt change
      expect(newState.items.get('item1')).not.toBeUndefined();
      expect(newState.items.get('item1').get('selected')).toEqual({
        currencySymbol: 'S/',
        period: '2 Años',
        periodId: 'c181f276-09cc-41d6-a6d9-52dc357a2689',
        price: 193,
      });
      expect(newState.total).toEqual(193);
    });
  });
});


