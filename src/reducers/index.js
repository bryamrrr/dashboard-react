import { combineReducers } from 'redux-immutable';

import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import cart from './cart/reducer';
import context from './context/reducer';
import prices from './prices/reducer';
import routes from './routes/reducer';
import zones from './zones/reducer';

const rootReducer = combineReducers({
  auth,
  cart,
  context,
  form,
  prices,
  routes,
  zones,
});

export default rootReducer;
