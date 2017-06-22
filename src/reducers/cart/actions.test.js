import {
  TOGGLE_CART,
  CLOSE_CART,
  toggleCart,
  closeCart,
} from './actions';

describe('Cart - Actions', () => {
  describe('TOGGLE_CART', () => {
    test('has the correct type', () => {
      const action = toggleCart();
      expect(action.type).toEqual(TOGGLE_CART);
    });

    test('has not payload', () => {
      const action = toggleCart();
      expect(action.type).toBeUndefined;
    });
  });

  describe('CLOSE_CART', () => {
    test('has the correct type', () => {
      const action = closeCart();
      expect(action.type).toEqual(CLOSE_CART);
    });

    test('has not payload', () => {
      const action = closeCart();
      expect(action.payload).toBeUndefined();
    });
  });
});
