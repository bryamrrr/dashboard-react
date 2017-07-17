import {
  createStore,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './index';

import { fetchCart } from './cart/actions';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch(fetchCart());

export default store;
