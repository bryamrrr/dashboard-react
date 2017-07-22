import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import profile from './profile';

import {
  setProfile,
  fetchProfile,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('User - Actions', () => {
  describe('fetchProfile', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setProfile whenn fetch user data', () => {
      nock(constants.urls.API_SONQO)
        .get('/profile')
        .reply(200, profile);

      const store = mockStore(initialState);

      return store.dispatch(fetchProfile()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setProfile(profile)]);
      })
    });
  });
});
