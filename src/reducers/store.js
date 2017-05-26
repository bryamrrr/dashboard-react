import {
  createStore,
  applyMiddleware,
} from 'redux';

import rootReducer from './index';

const store = createStore(
  rootReducer,
  applyMiddleware(),
);

export default store;
