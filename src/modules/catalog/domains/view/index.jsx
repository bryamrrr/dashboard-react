import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { connect } from 'react-redux';

import DomainSearch from '../../../../components/domain-search';
import Info from '../../../../components/info';
import DomainsTable from '../domains-table';

import { addProduct } from '../../../../reducers/cart/actions';
import { fetchPrices } from '../../../../reducers/domains/actions';
import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainsCatalog extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { domains: null };

    this.addToCart = this.addToCart.bind(this);
    this.getDomains = this.getDomains.bind(this);
  }

  componentWillMount() {
    this.props.setRoute({ title: 'Catálogo' }, { title: 'Dominios' });
  }

  componentDidMount() {
    // If store hasn't domain prices, then we make a request
    if (this.props.prices.size === 0) this.props.fetchPrices();
  }

  getDomains(domains) {
    this.setState({ domains });
  }

  addToCart() {
    const domain = this.state.domains[0];
    const pricesData = this.props.prices[domain.zone.substring(1)];

    domain.prices = _.mapKeys(pricesData.prices.buy, 'period');
    domain.selected = domain.prices.Anual;
    this.props.addProduct(domain, 'Dominio');

    const url = `/detalle-producto/item${this.props.cart.count + 1}/paquetes`;
    this.context.router.history.push(url);
  }

  render() {
    const { domains } = this.state;
    let text = '';
    let type = 'info';

    if (domains && domains[0]) {
      if (domains[0].available) {
        text = `El dominio ${domains[0].domain} se encuentra disponible.`;
        type = 'success';
      } else {
        text = `El dominio ${domains[0]} no se encuentra disponible.`;
        type = 'warning';
      }
    }

    return (
      <div>
        <h2 className={styles.title}>Encuentra aquí el dominio que buscas</h2>
        <DomainSearch
          getDomains={this.getDomains}
        />
        {(domains &&
          <Info
            text={text}
            type={type}
            addToCart={this.addToCart}
          />
        )}
        {(domains && domains.length > 1 &&
          <DomainsTable
            domains={domains}
            prices={this.props.prices}
          />
        )}
      </div>
    );
  }
}

DomainsCatalog.propTypes = {
  prices: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  addProduct: PropTypes.func.isRequired,
  cart: PropTypes.shape({ count: PropTypes.number }).isRequired,
  fetchPrices: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
};

DomainsCatalog.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    prices: state.get('domains').prices,
    zones: state.get('domains').zones,
    cart: state.get('cart'),
  };
}

export default connect(mapStateToProps, {
  addProduct,
  fetchPrices,
  setRoute,
})(DomainsCatalog);
