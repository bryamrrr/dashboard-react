import _ from 'lodash';

import { SET_ZONES } from './actions';

function reducer(state = {}, action) {
  switch (action.type) {
    case SET_ZONES:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}

export default reducer;
