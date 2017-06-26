import { SET_ROUTE } from './actions';

export const initialState = {
  module: {
    title: 'Bienvenido a Yachay',
    url: '',
  },
  view: {},
  method: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTE:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
