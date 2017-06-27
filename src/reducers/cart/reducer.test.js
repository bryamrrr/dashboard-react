import reducer, { initialState } from './reducer';
import {
  TOGGLE_CART,
  CLOSE_CART,
  ADD_PRODUCT,
} from './actions';

describe('Cart - Reducer', () => {
  describe('Initial state', () => {
    test('returns initial state by default', () => {
      const action = { type: '' };
      expect(reducer(undefined, action)).toEqual(initialState);
    })
  });

  describe('TOOGLE_CART', () => {
    test('changes the isOpen property correctly', () => {
      const action = { type: TOGGLE_CART };
      expect(reducer(undefined, action).isOpen).toBeTruthy();
      expect(reducer({ isOpen: true }, action).isOpen).toBeFalsy();
    })
  });

  describe('CLOSE_CART', () => {
    test('changes the isOpen property to false', () => {
      const action = { type: CLOSE_CART };
      expect(reducer(undefined, action).isOpen).toBeFalsy();
      expect(reducer({ isOpen: true }, action).isOpen).toBeFalsy();
    })
  });

  describe('ADD_PRODUCT', () => {
    let action;

    beforeEach(() => {
      action = {
        type: ADD_PRODUCT,
        payload: {
          productId: '1',
          domain: 'miempresa.pe',
        },
      };
    });

    test('add new product to cart', () => {
      const state = reducer(undefined, action);
      expect(state.items['1']).not.toBeUndefined();

      action.payload = {
        productId: '2',
        domain: 'miempresa.com',
      };
      expect(reducer(state, action).count).toEqual(2);
    })

    // TODO Show toaster
    // test('doesnt add the same product twice', () => {
    //   const state = {
    //     items: [{ productId: "1" }],
    //   }
    //   expect(reducer(state, action).items).toHaveLength(1);
    // })
  });
});
