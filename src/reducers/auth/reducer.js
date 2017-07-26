import {
  Record,
  Map as map,
} from 'immutable';

import {
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

let token = '';
let user = map();

if (localStorage.getItem('token')) {
  token = localStorage.getItem('token');
  if (localStorage.getItem('user')) user = new UserRecord(JSON.parse(localStorage.getItem('user')));
}

export const initialState = new AuthRecord({ token, user });

function reducer(state = initialState, action) {
  switch (action.type) {
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
