import { Map as map } from 'immutable';

import reducer, { initialState } from './reducer';
import {
  LOGIN_SUCCESS,
  loginUser,
} from './actions';

describe('Reducer - Auth', () => {
  test('return initial state by default', () => {
    const action = { type: '' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  test('updates user info when login success', () => {
    const action = loginUser(map({
      email: 'admin',
      password: '123',
    }))
    const state = reducer(undefined, action);
    const newAction = {
      type: LOGIN_SUCCESS,
      payload: {
        user: {
          email: 'admin',
          firstName: 'Nombre del usuario',
        },
        token: 'servertoken',
      },
    };

    const newState = reducer(state, newAction);
    expect(newState.user.email).toEqual('admin');
    expect(newState.user.firstName).toEqual('Nombre del usuario');
    expect(newState.token).toEqual('servertoken');
  });
});