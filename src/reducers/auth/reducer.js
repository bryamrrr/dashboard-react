import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './actions';

const isNode = typeof localStorage === 'undefined';
let token = '';

if (!isNode) token = localStorage.getItem('token') || '';

function reducer(state = { token }, action) {
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
    default:
      return state;
  }
}

export default reducer;
