import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './actions';

function reducer(state = {
  token: localStorage.getItem('token') || '',
}, action) {
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
