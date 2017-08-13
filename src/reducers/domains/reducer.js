import { Map as map } from 'immutable';

import _ from 'lodash';

import { SET_PRICES } from './actions';

function reducer(state = map({}), action) {
  switch (action.type) {
    case SET_PRICES:
      return state.merge(map(_.mapKeys(action.payload, 'countryProductId')));
    default:
      return state;
  }
}

export default reducer;
