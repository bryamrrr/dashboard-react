import reducer, { initialState } from './reducer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from './actions';

describe('Reducer - Auth', () => {
  let action;

  beforeEach(() => {
    action = {
      type: LOGIN_REQUEST,
      payload: {
        username: 'admin',
        password: '123456',
      },
    };
  });

  test('return initial state by default', () => {
    const action = { type: '' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  test('stores username when user request to login', () => {
    const state = reducer(undefined, action);
    expect(state.get('user').get('username')).toEqual('admin');
  });

  test('updates user info when login success', () => {
    const state = reducer(undefined, action);
    const newAction = {
      type: LOGIN_SUCCESS,
      payload: {
        user: {
          username: 'admin',
          firstName: 'Nombre del usuario',
        },
        access_token: 'servertoken',
      },
    };

    const newState = reducer(state, newAction);
    expect(newState.get('user').get('username')).toEqual('admin');
    expect(newState.get('user').get('firstName')).toEqual('Nombre del usuario');
    expect(newState.get('token')).toEqual('servertoken');
  });
});