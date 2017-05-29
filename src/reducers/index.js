import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import auth from '../extra/auth/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
});

export default rootReducer;
