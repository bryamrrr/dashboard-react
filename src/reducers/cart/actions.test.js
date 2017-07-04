import configureStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

import { initialState } from './reducer';
import constants from '../../extra/constants';
import packages from './packages';

import {
  TOGGLE_CART,
  CLOSE_CART,
  ADD_PRODUCT,
  toggleCart,
  closeCart,
  addProduct,
  fetchPackages,
  setPackages,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Cart - Actions', () => {
  describe('TOGGLE_CART', () => {
    test('has the correct type', () => {
      const action = toggleCart();
      expect(action.type).toEqual(TOGGLE_CART);
    });

    test('has not payload', () => {
      const action = toggleCart();
      expect(action.payload).toBeUndefined();
    });
  });

  describe('CLOSE_CART', () => {
    test('has the correct type', () => {
      const action = closeCart();
      expect(action.type).toEqual(CLOSE_CART);
    });

    test('has not payload', () => {
      const action = closeCart();
      expect(action.payload).toBeUndefined();
    });
  });

  describe('ADD_PRODUCT', () => {
    test('has the correct type', () => {
      const action = addProduct();
      expect(action.type).toEqual(ADD_PRODUCT);
    });

    test('has the correct payload', () => {
      const action = addProduct({ id: '1', name: 'dominio.pe' }, 'domain');
      expect(action.payload.item).toEqual({ id: '1', name: 'dominio.pe' });
      expect(action.payload.category).toEqual('domain');
    });
  });

  describe('fetchPackages', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    test('creates setPackages action when fetching packages has been done', () => {
      nock(constants.urls.API_MOCKS)
        .get('/packages/123')
        .reply(200, packages);

      const store = mockStore(initialState);

      return store.dispatch(fetchPackages('123')).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([setPackages('123', packages.results)]);
      })
    });
  });
});
