import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

import store from '../store';

export const TOGGLE_CART = 'TOGGLE_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PACKAGES = 'SET_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SELECT_PERIOD = 'SELECT_PERIOD';
export const SET_CART = 'SET_CART';
export const ITEM_DELETED = 'ITEM_DELETED';

export function toggleCart() {
  return { type: TOGGLE_CART };
}

export function closeCart() {
  return { type: CLOSE_CART };
}

export function addProduct(item, category) {
  return {
    type: ADD_PRODUCT,
    payload: {
      item,
      category,
    },
  };
}

export function addPackage(item, packageData) {
  return {
    type: ADD_PACKAGE,
    payload: {
      item,
      packageData,
    },
  };
}

export function setPackages(productId, packages) {
  return {
    type: SET_PACKAGES,
    payload: { productId, packages },
  };
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    payload: item,
  };
}

export function selectPeriod(item, selected) {
  return {
    type: SELECT_PERIOD,
    payload: {
      item,
      selected,
    },
  };
}

export function setCart(data) {
  return {
    type: SET_CART,
    payload: data,
  };
}

export function itemDeleted() {
  return { type: ITEM_DELETED };
}

export function fetchPackages(itemId, productId) {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/packages/${productId}`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setPackages(itemId, results));
  };
}

export function fetchCart(email) {
  return async (dispatch) => {
    const url = `${constants.urls.API_CART}/carts?ownerEmail=${email}`;
    const { data, meta } = await httpRequest('GET', url);
    if (meta.ok) dispatch(setCart(data.results[0]));
  };
}

export function deleteItemFromBackend(itemId) {
  return async (dispatch) => {
    const cartId = store.getState().get('cart').id;
    const url = `${constants.urls.API_CART}/carts/${cartId}/items/${itemId}`;
    httpRequest('DELETE', url);
    dispatch(itemDeleted());
  };
}
