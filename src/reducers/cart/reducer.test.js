import reducer from './reducer';
import {
  TOGGLE_CART,
  CLOSE_CART,
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
});
