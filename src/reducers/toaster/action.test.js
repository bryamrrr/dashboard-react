import {
  SHOW_TOASTER,
  showToaster,
} from './actions';

describe('Toaster - Actions', () => {
  describe('SHOW_TOASTER', () => {
    test('has the correct type', () => {
      const action = showToaster();
      expect(action.type).toEqual(SHOW_TOASTER);
    });
    test('has the correct payload', () => {
      const action = showToaster('success', 'Se agregó al carrito');
      expect(action.payload.type).toEqual('success');
      expect(action.payload.message).toEqual('Se agregó al carrito');
    });
  });
});
