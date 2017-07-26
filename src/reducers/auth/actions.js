import jwtDecode from 'jwt-decode';

import httpRequest from '../../extra/http-request';
import constants from '../../extra/constants';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

export function receiveLogout() {
  return { type: LOGOUT_SUCCESS };
}

export function loginUser(creds) {
  return async (dispatch) => {
    const toSend = { // FIXME
      email: creds.get('email'),
      password: creds.get('password'),
    };

    try {
      const url = `${constants.urls.API_SECURITY}/access_token`;
      const {
        data: { token },
        meta,
      } = await httpRequest('POST', url, toSend);

      if (meta.ok) {
        const { user } = jwtDecode(token);

        dispatch(receiveLogin({ user, token }));

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      } else {
        dispatch(loginError(meta));
      }
    } catch (error) {
      console.error(`Unhandled error in loginUser action creator: ${error}`);
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      dispatch(receiveLogout());

      const url = `${constants.urls.API_SECURITY}/logout`;
      const data = { email: JSON.parse(localStorage.getItem('user')).email };
      await httpRequest('POST', url, data);

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  };
}
