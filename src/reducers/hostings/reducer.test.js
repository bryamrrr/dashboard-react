import reducer, { initialState } from './reducer';

import { SET_PRODUCTS } from './actions';

describe('Domains - Reducer', () => {
  let action;

  beforeEach(() => {
    action = {
      type: SET_PRODUCTS,
      payload: [{
        period: "Anual",
        price: 178,
        id: "aeb662ef-0117-450a-91e2-a067893e9767",
      }],
    }
  });

  test('return initialState by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('sets prices with the correct payload', () => {
    const newState = reducer(undefined, action);
    expect(newState.products.get('aeb662ef-0117-450a-91e2-a067893e9767')).toEqual({
      period: "Anual",
      price: 178,
      id: "aeb662ef-0117-450a-91e2-a067893e9767",
    });
  });
});
