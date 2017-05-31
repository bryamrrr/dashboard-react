import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './auth/reducer';
import context from './context/reducer';
import state from './state/reducer';

const rootReducer = combineReducers({
  form,
  auth,
  context,
  state,
});

export default rootReducer;
