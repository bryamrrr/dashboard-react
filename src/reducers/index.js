import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import context from './context/reducer';
import auth from './auth/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  context,
});

export default rootReducer;
