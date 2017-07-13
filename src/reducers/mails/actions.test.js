import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import products from './products';
import prices from './prices';

import {
  setMails,
  setMailPrices,
  fetchMails,
  fetchMailPrices,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Domains - Actions', () => {
  describe('fetchMails', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setMails action when fetching products has been done', () => {
      nock(constants.urls.API_MOCKS)
        .get('/products/email')
        .reply(200, products);

      const store = mockStore(initialState);

      return store.dispatch(fetchMails()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setMails(products.results)]);
      })
    });
  });

  describe('fetchMailPrices', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setPrices action when fetching prices has been done', () => {
      nock(constants.urls.API_MOCKS)
        .get('/prices?type=email')
        .reply(200, prices);

      const store = mockStore(initialState);

      return store.dispatch(fetchMailPrices()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setMailPrices(prices.results)]);
      })
    });
  });
});
