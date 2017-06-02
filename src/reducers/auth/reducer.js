import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from './actions';

const isNode = typeof localStorage === 'undefined';
let token = '';
let user = {};

if (!isNode) {
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user'));
}

function reducer(state = { token, user }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        creds: action.payload,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.payload.access_token,
        user: action.payload.user,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: 'Error en el login',
      });
    case LOGOUT_SUCCESS:
      return {
        token: '',
        user: {},
      };
    default:
      return state;
  }
}

export default reducer;
