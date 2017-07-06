import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import products from './products';

import {
  setHostings,
  fetchHostings,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Domains - Actions', () => {
  describe('fetchHostings', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setHostings action when fetching products has been done', () => {
      nock(constants.urls.API_MOCKS)
        .get('/products/hosting')
        .reply(200, products);

      const store = mockStore(initialState);

      return store.dispatch(fetchHostings()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setHostings(products.results)]);
      })
    });
  });
});
