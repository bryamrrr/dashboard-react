import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Login from './modules/login/view';
import Signup from './modules/signup/view';
import Reset from './modules/reset/view';
import Retrieve from './modules/retrieve/view';

export default function () {
  return (
    <main role="application">
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/registro" exact component={Signup} />
        <Route path="/reset" exact component={Reset} />
        <Route path="/users/:email/forgotpassword/:hash" exact component={Retrieve} />
      </Switch>
    </main>
  );
}
