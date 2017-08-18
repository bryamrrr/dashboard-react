import constants from '../../extra/constants';
import httpRequest from '../../extra/http-request';

export const SET_MAILS = 'SET_MAILS';
export const SET_MAIL_PRICES = 'SET_MAIL_PRICES';

export function setMails(data) {
  return {
    type: SET_MAILS,
    payload: data,
  };
}

export function setMailPrices(data) {
  return {
    type: SET_MAIL_PRICES,
    payload: data,
  };
}

export function fetchMails() {
  return async (dispatch) => {
    const url = `${constants.urls.API_SONQO}/products/correo?period=ano-1&operation=alta`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setMails(results));
  };
}

export function fetchMailPrices() {
  return async (dispatch) => {
    const url = `${constants.urls.API_SONQO}/prices?category_slug=correo`;
    const { data: { results } } = await httpRequest('GET', url);
    dispatch(setMailPrices(results));
  };
}
