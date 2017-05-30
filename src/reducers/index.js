import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import auth from './auth/reducer';
import context from './context/reducer';
import state from './state/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  context,
  state,
});

export default rootReducer;
