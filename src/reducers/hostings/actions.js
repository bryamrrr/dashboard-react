import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_HOSTINGS = 'SET_HOSTINGS';
export const SET_HOSTING_PRICES = 'SET_HOSTING_PRICES';

export function setHostings(data) {
  return {
    type: SET_HOSTINGS,
    payload: data,
  };
}

export function setHostingPrices(data) {
  return {
    type: SET_HOSTING_PRICES,
    payload: data,
  };
}

export function fetchHostings() {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/products/hosting`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setHostings(results));
  };
}

export function fetchHostingPrices() {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/prices?type=hosting`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setHostingPrices(results));
  };
}
