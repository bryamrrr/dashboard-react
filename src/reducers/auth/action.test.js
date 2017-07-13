import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  requestLogin,
  receiveLogin,
  loginError,
  receiveLogout,
  loginUser,
  logoutUser,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Cart - Actions', () => {
  describe('loginUser', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates requestLogin and receiveLogin actions when login a user succesfully', () => {
      const creds = {
        username: 'admin',
        password: '123',
      };
      const data = {
        access_token: 'abcdefg',
        user: {
          username: 'admin',
          firstName: 'Bryam',
        }
      };

      nock(constants.urls.API_SECURITY)
        .post('/access_token')
        .reply(200, data);

      const store = mockStore(initialState);

      return store.dispatch(loginUser(creds)).then(() => {
        expect(store.getActions()).toEqual([requestLogin(creds), receiveLogin(data)]);
      })
    });

    test('creates requestLogin and loginError actions when login a user wrong', () => {
      const creds = {
        username: 'admin',
        password: '123',
      };
      const error = { message: 'Hubo un error' };

      nock(constants.urls.API_SECURITY)
        .post('/access_token')
        .reply(401, error);

      const store = mockStore(initialState);

      return store.dispatch(loginUser(creds)).then(() => {
        expect(store.getActions()[0].type).toEqual(LOGIN_REQUEST);
        expect(store.getActions()[1].type).toEqual(LOGIN_FAILURE);
      })
    });
  });

  describe('logoutUser', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates requestLogin and receiveLogin actions when login a user succesfully', () => {
      nock(constants.urls.API_SECURITY)
        .post('/logout')
        .reply(200, {});

      const store = mockStore(initialState);

      return store.dispatch(logoutUser()).then(() => {
        expect(store.getActions()).toEqual([receiveLogout()]);
      })
    });
  });
});
