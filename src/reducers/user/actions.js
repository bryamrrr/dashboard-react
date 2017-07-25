import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_PROFILE = 'SET_PROFILE';

export function setProfile(data) {
  return {
    type: SET_PROFILE,
    payload: data,
  };
}

export function fetchProfile() {
  return async (dispatch) => {
    const url = `${constants.urls.API_SONQO}/profile?includes=country,businessArea,documentType,customerType`;
    const { data } = await httpRequest('GET', url);
    dispatch(setProfile(data));
  };
}
