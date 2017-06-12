import { CHANGE_STATE } from './actions';

function reducer(state = {
  module: 'Bienvenido a Yachay',
  view: '',
  method: '',
}, action) {
  switch (action.type) {
    case CHANGE_STATE:
      // TODO
      return state;
    default:
      return state;
  }
}

export default reducer;
