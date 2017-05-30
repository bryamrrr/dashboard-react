import httpRequest from '../httpRequest';
import constants from '../constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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

export function loginUser(creds) {
  return async (dispatch) => {
    dispatch(requestLogin(creds));

    try {
      const { user, access_token } = await httpRequest('POST', `${constants.urls.API_SECURITY}/access_token`, creds);

      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', access_token);

      dispatch(receiveLogin({ user, access_token }));
    } catch (error) {
      dispatch(loginError(error));
    }
  };
}
