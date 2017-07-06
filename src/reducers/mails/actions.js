import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_MAILS = 'SET_MAILS';

export function setMails(data) {
  return {
    type: SET_MAILS,
    payload: data,
  };
}

export function fetchMails() {
  return async (dispatch) => {
    const url = `${constants.urls.API_MOCKS}/products/email`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setMails(results));
  };
}
