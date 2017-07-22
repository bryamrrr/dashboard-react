import reducer, { initialState } from './reducer';

import { SET_PROFILE } from './actions';

describe('User - Reducers', () => {
  let action;

  beforeEach(() => {
    action = {
      type: SET_PROFILE,
      payload: {
        name: 'Bryam',
        phone: '123456789',
      },
    };
  });

  test('return initialState by default', () => {
    const action = { type: '' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('sets profile in the correct place', () => {
    const newState = reducer(undefined, action);
    expect(newState.profile).toEqual({
      name: 'Bryam',
      phone: '123456789',
    });
  });
});