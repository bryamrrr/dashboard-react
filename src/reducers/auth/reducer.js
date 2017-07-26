import {
  Record,
  Map as map,
} from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  // LOGIN_FAILURE,
} from './actions';

const AuthRecord = Record({
  token: '',
  user: map(),
});

const UserRecord = Record({
  username: '',
  status: '',
  firstName: '',
  lastName: '',
  email: '',
  id: '',
});

const isNode = typeof localStorage === 'undefined';
let token = '';
let user = map();

if (!isNode) {
  token = localStorage.getItem('token') || '';

  if (localStorage.getItem('user')) user = new UserRecord(JSON.parse(localStorage.getItem('user')));
} else {
  token = 'servertoken';
}

export const initialState = new AuthRecord({ token, user });

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.setIn(['user', 'username'], action.payload.username);
    case LOGIN_SUCCESS:
      return state
        .set('user', new UserRecord(action.payload.user))
        .set('token', action.payload.token);
    case LOGOUT_SUCCESS:
      return new AuthRecord({ token: '', user: new UserRecord({}) });
    default:
      return state;
    // case LOGIN_FAILURE:
    //   return Object.assign({}, state, {
    //     error: 'Error en el login',
    //   });
  }
}

export default reducer;
