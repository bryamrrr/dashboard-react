import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import products from './products';

import {
  setProducts,
  fetchProducts,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Domains - Actions', () => {
  describe('fetchProducts', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setProducts action when fetching products has been done', () => {
      nock(constants.urls.API_MOCKS)
        .get('/products/hosting')
        .reply(200, products);

      const store = mockStore(initialState);

      return store.dispatch(fetchProducts()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setProducts(products.results)]);
      })
    });
  });
});
