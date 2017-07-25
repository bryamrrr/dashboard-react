import { Record } from 'immutable';

import { SET_PROFILE } from './actions';

const UserRecord = new Record({
  profile: {},
});

export const initialState = new UserRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return state.set('profile', action.payload);
    default:
      return state;
  }
}

export default reducer;
