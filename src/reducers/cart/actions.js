import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const TOGGLE_CART = 'TOGGLE_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PACKAGES = 'SET_PACKAGES';

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

export function setPackages(productId, packages) {
  return {
    type: SET_PACKAGES,
    payload: { productId, packages },
  };
}

export function fetchPackages(itemId, productId) {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/packages/${productId}`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setPackages(itemId, results));
  };
}
