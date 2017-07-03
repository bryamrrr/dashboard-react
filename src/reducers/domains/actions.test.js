import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import prices from './prices';

import {
  setPrices,
  fetchPrices,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Domains - Actions', () => {
  describe('requestPrices', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setPrices action when fetching prices has been done', () => {
      nock(constants.urls.API_MOCKS)
        .get('/domains/prices')
        .reply(200, prices);

      const store = mockStore(initialState);

      return store.dispatch(fetchPrices()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setPrices(prices.results)]);
      })
    });
  });
});
