import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers/store';

import Page from './page';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </Provider>,
  document.getElementById('render-target'),
);
