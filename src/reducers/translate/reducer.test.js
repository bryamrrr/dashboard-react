import {
  SET_LANGUAGE,
  setLanguage,
} from './actions.js';

import reducer, { initialState } from './reducer';

describe('Translate - Reducer', () => {
  test('returns initial state by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('set the correct route', () => {
    const action = {
      type: SET_LANGUAGE,
      payload: 'en',
    };

    expect(reducer(undefined, action).selected).toEqual('en');
  });
});
