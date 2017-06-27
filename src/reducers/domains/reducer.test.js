import reducer, { initialState } from './reducer';

import { SET_PRICES } from './actions';

describe('Domains - Reducer', () => {
  let action;

  beforeEach(() => {
    action = {
      type: SET_PRICES,
      payload: [{ zone: 'pe', prices: { renew: [], buy: [] } }],
    }
  });

  test('return initialState by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('sets prices with the correct payload', () => {
    expect(reducer(undefined, action).prices).toEqual({
      'pe': { zone: 'pe', prices: { renew: [], buy: [] } },
    });
  });
});
