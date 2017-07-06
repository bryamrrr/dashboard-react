import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import products from './products';

import {
  setMails,
  fetchMails,
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
});
