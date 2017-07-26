import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Switch, Route, withRouter } from 'react-router-dom';

import PublicRoute from './extra/public-route';
import PrivateRoute from './extra/private-route';

import Login from './modules/security/login/view';
import Signup from './modules/security/signup/view';
import Reset from './modules/security/reset/view';
import Retrieve from './modules/security/retrieve/view';
import ConfirmEmail from './modules/security/confirm-email/view';

import Home from './modules/home/view';

import DomainsCatalog from './modules/catalog/domains/view';
import HostingCatalog from './modules/catalog/hosting/view';
import MailsCatalog from './modules/catalog/mails/view';

import ProductDetails from './modules/sales/product-details/view';
import CartDetails from './modules/sales/cart-details/view';
import PaymentDetails from './modules/sales/payment-details/view';
import Order from './modules/sales/order/view';

import DomainsService from './modules/service/domains/view';
import DomainContactList from './modules/service/domains-contact/view';
import DomainRegisterList from './modules/service/domains-register/view';
import DomainDnsList from './modules/service/domains-dns/view';
import DomainDnsSubordinateList from './modules/service/domains-dns-subordinate/view';
import DomainDnsSubordinateNew from './modules/service/domains-dns-subordinate-new/view';
import HostingService from './modules/service/hosting/view';
import MailsService from './modules/service/mails/view';

import UserData from './modules/user/data/view';
import UserPassword from './modules/user/password/view';
import UserContact from './modules/user/contact/view';
import UserContactNew from './modules/user/contact-new/view';
import UserAddress from './modules/user/address/view';
import UserAddressNew from './modules/user/address-new/view';
import UserPurchases from './modules/user/purchases/view';
import UserBills from './modules/user/bills/view';

import { fetchCart } from './reducers/cart/actions';

class Page extends Component {
  componentWillMount() {
    const { email, id } = this.props;
    if (id !== '') this.props.fetchCart(email, id);
  }

  render() {
    return (
      <main role="application">
        <Switch>
          <Route path="/confirm/:token"><ConfirmEmail /></Route>

          <PublicRoute path="/login" exact><Login /></PublicRoute>
          <PublicRoute path="/registro" exact><Signup /></PublicRoute>
          <PublicRoute path="/reset" exact><Reset /></PublicRoute>
          <PublicRoute path="/change_password/:token" exact><Retrieve /></PublicRoute>

          <PrivateRoute path="/inicio" exact><Home /></PrivateRoute>

          <PrivateRoute path="/catalogo/dominios" exact><DomainsCatalog /></PrivateRoute>
          <PrivateRoute path="/catalogo/hosting" exact><HostingCatalog /></PrivateRoute>
          <PrivateRoute path="/catalogo/correos" exact><MailsCatalog /></PrivateRoute>

          <PrivateRoute path="/detalle-producto/:productId/paquetes" exact><ProductDetails /></PrivateRoute>
          <PrivateRoute path="/detalle-compra" exact><CartDetails /></PrivateRoute>
          <PrivateRoute path="/compra" exact><PaymentDetails /></PrivateRoute>
          <PrivateRoute path="/orden" exact><Order /></PrivateRoute>

          <PrivateRoute path="/servicios/dominios" exact><DomainsService /></PrivateRoute>
          <PrivateRoute path="/servicios/dominios/contactos" exact><DomainContactList /></PrivateRoute>
          <PrivateRoute path="/servicios/dominios/dnssubordinados" exact><DomainDnsSubordinateList /></PrivateRoute>
          <PrivateRoute path="/servicios/dominios/nuevo-dnssubordinado" exact><DomainDnsSubordinateNew /></PrivateRoute>
          <PrivateRoute path="/servicios/dominios/registros" exact><DomainRegisterList /></PrivateRoute>
          <PrivateRoute path="/servicios/dominios/dns" exact><DomainDnsList /></PrivateRoute>
          <PrivateRoute path="/servicios/hosting" exact><HostingService /></PrivateRoute>
          <PrivateRoute path="/servicios/correos" exact><MailsService /></PrivateRoute>

          <PrivateRoute path="/usuario/datos" exact><UserData /></PrivateRoute>
          <PrivateRoute path="/usuario/cambio-contraseña" exact><UserPassword /></PrivateRoute>
          <PrivateRoute path="/usuario/contactos" exact><UserContact /></PrivateRoute>
          <PrivateRoute path="/usuario/nuevo-contacto" exact><UserContactNew /></PrivateRoute>
          <PrivateRoute path="/usuario/editar-contacto/:id" exact><UserContactNew /></PrivateRoute>
          <PrivateRoute path="/usuario/direcciones" exact><UserAddress /></PrivateRoute>
          <PrivateRoute path="/usuario/nueva-direccion" exact><UserAddressNew /></PrivateRoute>
          <PrivateRoute path="/usuario/editar-direccion/:id" exact><UserAddressNew /></PrivateRoute>
          <PrivateRoute path="/usuario/compras" exact><UserPurchases /></PrivateRoute>
          <PrivateRoute path="/usuario/comprobantes" exact><UserBills /></PrivateRoute>
        </Switch>
      </main>
    );
  }
}

Page.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.get('auth').user.email,
    id: state.get('auth').user.id,
  };
}

export default withRouter(connect(mapStateToProps, { fetchCart })(Page));
