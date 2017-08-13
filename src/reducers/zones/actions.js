import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_ZONES = 'SET_ZONES';

export function setZones(data) {
  return {
    type: SET_ZONES,
    payload: data,
  };
}

export function fetchZones() {
  return async (dispatch) => {
    const url = `${constants.urls.API_SONQO}/dnszones`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setZones(results));
  };
}
