import reducer from './reducer';
import {
  TOGGLE_CART,
  CLOSE_CART,
  ADD_PRODUCT,
} from './actions';

describe('Cart - Reducer', () => {
  let action;

  describe('TOOGLE_CART', () => {
    beforeEach(() => {
      action = { type: TOGGLE_CART };
    });

    test('changes the isOpen property correctly', () => {
      expect(reducer(undefined, action).isOpen).toBeTruthy();
      expect(reducer({ isOpen: true }, action).isOpen).toBeFalsy();
    })
  });

  describe('CLOSE_CART', () => {
    beforeEach(() => {
      action = { type: CLOSE_CART };
    });

    test('changes the isOpen property to false', () => {
      expect(reducer(undefined, action).isOpen).toBeFalsy();
      expect(reducer({ isOpen: true }, action).isOpen).toBeFalsy();
    })
  });

  describe('ADD_PRODUCT', () => {
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
      expect(reducer(state, action).items['2']).not.toBeUndefined();
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
