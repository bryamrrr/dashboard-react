import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Login from './modules/login/view';

export default function () {
  return (
    <main role="application">
      <Switch>
        <Route
          path="/login"
          exact
          component={Login}
        />
      </Switch>
    </main>
  );
}
