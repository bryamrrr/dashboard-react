import { combineReducers } from 'redux-immutable';

import domains from '../domains/reducer';
import hostings from '../hostings/reducer';
import mails from '../mails/reducer';

const rootReducer = combineReducers({
  domains,
  hostings,
  mails,
});

export default rootReducer;
