import {
  Record,
  Map as map,
} from 'immutable';

import { SET_ROUTE } from './actions';

const RoutesRecord = Record({
  module: map({
    title: 'Bienvenido a Yachay',
    url: '',
  }),
  view: map(),
  method: map(),
});

export const initialState = new RoutesRecord();

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTE:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
