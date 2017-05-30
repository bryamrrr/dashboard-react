import httpRequest from '../../extra/httpRequest';
import constants from '../../extra/constants';

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

    const toSend = { // FIXME
      email: creds.username,
      password: creds.password,
    };

    try {
      const response = await httpRequest('POST', `${constants.urls.API_SECURITY}/access_token`, toSend);
      const { user, access_token } = await response.json();

      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', access_token);

      dispatch(receiveLogin({ user, access_token }));
    } catch (error) {
      dispatch(loginError(error));
    }
  };
}
