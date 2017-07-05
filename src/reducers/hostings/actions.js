import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export function setProducts(data) {
  return {
    type: SET_PRODUCTS,
    payload: data,
  };
}

export function fetchProducts() {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/products/hosting`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setProducts(results));
  };
}
