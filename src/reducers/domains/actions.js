import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_PRICES = 'SET_PRICES';

export function setPrices(data) {
  return {
    type: SET_PRICES,
    payload: data,
  };
}

export function fetchPrices() {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/prices?type=dominio`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setPrices(results));
  };
}
