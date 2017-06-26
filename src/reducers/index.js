import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import cart from './cart/reducer';
import domains from './domains/reducer';
import context from './context/reducer';
import state from './state/reducer';

const rootReducer = combineReducers({
  form,
  auth,
  cart,
  domains,
  context,
  state,
});

export default rootReducer;
