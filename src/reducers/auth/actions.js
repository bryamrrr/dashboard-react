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
      const {
        data: { user, access_token },
        meta,
      } = await httpRequest('POST', url, toSend);

      if (meta.ok) {
        dispatch(receiveLogin({ user, access_token }));

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', access_token);
      } else {
        dispatch(loginError(meta));
      }
    } catch (error) {
      console.error(`Unhandled error in loginUser action creator: ${error}`);
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    try {
      dispatch(receiveLogout());

      const url = `${constants.urls.API_SECURITY}/logout`;
      httpRequest('POST', url);

      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  };
}
