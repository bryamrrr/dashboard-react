import httpRequest from '../../extra/http-request';
import constants from '../../extra/constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    payload: creds,
  };
}

function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    payload: {},
  };
}

export function loginUser(creds) {
  return async (dispatch) => {
    dispatch(requestLogin(creds));

    const toSend = { // FIXME
      email: creds.username,
      password: creds.password,
    };

    try {
      const url = `${constants.urls.API_SECURITY}/access_token`;
      const response = await httpRequest('POST', url, toSend);
      const { user, access_token } = await response.json();

      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', access_token);

      dispatch(receiveLogin({ user, access_token }));
    } catch (error) {
      console.error(error);
      dispatch(loginError(error));
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      const url = `${constants.urls.API_SECURITY}/logout`;
      await httpRequest('POST', url);

      localStorage.removeItem('userData');
      localStorage.removeItem('token');

      dispatch(receiveLogout());
    } catch (error) {
      console.error(error);
    }
  };
}
