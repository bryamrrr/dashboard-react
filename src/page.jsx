import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Login from './modules/login/view';
import Signup from './modules/signup/view';

export default function () {
  return (
    <main role="application">
      <Switch>
        <Route
          path="/login"
          exact
          component={Login}
        />
        <Route
          path="/registro"
          exact
          component={Signup}
        />
      </Switch>
    </main>
  );
}
