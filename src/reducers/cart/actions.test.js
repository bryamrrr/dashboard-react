import {
  TOGGLE_CART,
  CLOSE_CART,
  ADD_PRODUCT,
  toggleCart,
  closeCart,
  addProduct,
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

  describe('ADD_PRODUCT', () => {
    test('has the correct type', () => {
      const action = addProduct();
      expect(action.type).toEqual(ADD_PRODUCT);
    });

    test('has the correct payload', () => {
      const action = addProduct({ id: '1', name: 'dominio.pe' });
      expect(action.payload).toEqual({ id: '1', name: 'dominio.pe' });
    });
  });
});
