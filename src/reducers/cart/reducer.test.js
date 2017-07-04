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
          },
          category: 'domain',
        },
      };
    });

    test('add new product to cart', () => {
      const state = reducer(undefined, action);
      expect(state.items.get('1')).not.toBeUndefined();

      action.payload = {
        item: {
          productId: '2',
          domain: 'miempresa.com',
        },
        category: 'domain',
      };

      const newState = reducer(state, action);
      expect(newState.count).toEqual(2);
      expect(newState.items.get('1')).not.toBeUndefined();
      expect(newState.items.get('1').get('type')).toEqual('product');
      expect(newState.items.get('1').get('category')).toEqual('domain');
      expect(newState.items.get('2')).not.toBeUndefined();
      expect(newState.items.get('2').get('category')).toEqual('domain');
    })

    // TODO Show toaster
    // test('doesnt add the same product twice', () => {
    //   const state = {
    //     items: [{ productId: "1" }],
    //   }
    //   expect(reducer(state, action).items).toHaveLength(1);
    // })
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
});
