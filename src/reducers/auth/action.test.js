import { Map as map } from 'immutable';

import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
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
      const creds = map({
        email: 'admin@rcp.pe',
        password: '123',
      });
      const data = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYXNoYm9hcmQiLCJzY29wZXMiOnt9LCJ1c2VyIjp7InVzZXJuYW1lIjoiYnJ5YW1yciIsInN0YXR1cyI6ImludmFsaWRhdGVkIiwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOiJicm9kcmlndWV6YXliYXJAZ21haWwuY29tIiwiaWQiOiI2NGFhNjQ5Ni1mNmE5LTRjYzktODY3Ny03YjJkYTEzMjcyZWQifSwiZXhwIjoxNTAxMTc3MjI1LCJpYXQiOjE1MDEwOTA4MjV9.Q_w8jlX0QsoNuNDLqK6L0KHt39_3UJKdPK5_3wJEna8' };

      nock(constants.urls.API_SECURITY)
        .post('/access_token')
        .reply(200, data);

      const store = mockStore(initialState);


      return store.dispatch(loginUser(creds)).then(() => {
        expect(store.getActions()).toEqual([receiveLogin({
          user: {
            username: 'bryamrr',
            status: 'invalidated',
            firstName: null,
            lastName: null,
            email: 'brodriguezaybar@gmail.com',
            id: '64aa6496-f6a9-4cc9-8677-7b2da13272ed',
          },
          token: data.token,
        })]);
      })
    });

    test('creates requestLogin and loginError actions when login a user wrong', () => {
      const creds = map({
        email: 'admin',
        password: '123',
      });
      const error = { message: 'Hubo un error' };

      nock(constants.urls.API_SECURITY)
        .post('/access_token')
        .reply(401, error);

      const store = mockStore(initialState);

      return store.dispatch(loginUser(creds)).then(() => {
        expect(store.getActions()[0].type).toEqual(LOGIN_FAILURE);
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
