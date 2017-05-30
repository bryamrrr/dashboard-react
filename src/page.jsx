import React from 'react';
import { Switch } from 'react-router-dom';

import PublicRoute from './extra/public-route';
import PrivateRoute from './extra/private-route';

import Login from './modules/login/view';
import Signup from './modules/signup/view';
import Reset from './modules/reset/view';
import Retrieve from './modules/retrieve/view';
import Home from './modules/home/view';

export default function () {
  return (
    <main role="application">
      <Switch>
        <PublicRoute path="/login" exact><Login /></PublicRoute>
        <PublicRoute path="/registro" exact><Signup /></PublicRoute>
        <PublicRoute path="/reset" exact><Reset /></PublicRoute>
        <PublicRoute path="/users/:email/forgotpassword/:hash" exact><Retrieve /></PublicRoute>

        <PrivateRoute path="/inicio" exact><Home /></PrivateRoute>
      </Switch>
    </main>
  );
}
