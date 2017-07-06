import { combineReducers } from 'redux-immutable';

import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import cart from './cart/reducer';
import domains from './domains/reducer';
import context from './context/reducer';
import hostings from './hostings/reducer';
import mails from './mails/reducer';
import routes from './routes/reducer';

const rootReducer = combineReducers({
  auth,
  cart,
  context,
  domains,
  form,
  hostings,
  mails,
  routes,
});

export default rootReducer;
