import {
  SHOW_TOASTER,
  showToaster,
} from './actions.js';

import reducer, { initialState } from './reducer';

describe('Toaster - Reducer', () => {
  test('returns initial state by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('set the correct route', () => {
    const action = {
      type: SHOW_TOASTER,
      payload: {
        type: 'success',
        message: 'Agregar elemento al carrito',
        id: '123',
      }
    };

    const newState = reducer(undefined, action);
    expect(newState.get('123').type).toEqual('success');
    expect(newState.get('123').message).toEqual('Agregar elemento al carrito');
  });
});
