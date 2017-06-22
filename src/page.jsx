import React from 'react';
import { Switch } from 'react-router-dom';

import PublicRoute from './extra/public-route';
import PrivateRoute from './extra/private-route';

import Login from './modules/login/view';
import Signup from './modules/signup/view';
import Reset from './modules/reset/view';
import Retrieve from './modules/retrieve/view';
import Home from './modules/home/view';

import DomainsCatalog from './modules/catalog/domains/view';
import HostingCatalog from './modules/catalog/hosting/view';
import MailsCatalog from './modules/catalog/mails/view';
import UserData from './modules/user/data/view';
import UserPassword from './modules/user/password/view';

export default function () {
  return (
    <main role="application">
      <Switch>
        <PublicRoute path="/login" exact><Login /></PublicRoute>
        <PublicRoute path="/registro" exact><Signup /></PublicRoute>
        <PublicRoute path="/reset" exact><Reset /></PublicRoute>
        <PublicRoute path="/users/:email/forgotpassword/:hash" exact><Retrieve /></PublicRoute>

        <PrivateRoute path="/inicio" exact><Home /></PrivateRoute>

        <PrivateRoute path="/catalogo/dominios" exact><DomainsCatalog /></PrivateRoute>
        <PrivateRoute path="/catalogo/hosting" exact><HostingCatalog /></PrivateRoute>
        <PrivateRoute path="/catalogo/correo" exact><MailsCatalog /></PrivateRoute>
        <PrivateRoute path="/usuario/datos" exact><UserData /></PrivateRoute>
        <PrivateRoute path="/usuario/cambio-contraseña" exact><UserPassword /></PrivateRoute>
      </Switch>
    </main>
  );
}
