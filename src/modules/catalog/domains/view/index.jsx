import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DomainSearch from '../../../../components/domain-search';
import Info from '../../../../components/info';
import DomainsTable from '../domains-table';

import { addProduct } from '../../../../reducers/cart/actions';
import { fetchPrices } from '../../../../reducers/domains/actions';

import styles from './styles.css';

class DomainsCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      domains: null,
    };

    this.addToCart = this.addToCart.bind(this);
    this.getDomains = this.getDomains.bind(this);
  }

  componentDidMount() {
    // If store hasn't domain prices, then we make a request
    if (!this.props.prices.renew && !this.props.prices.buy) this.props.fetchPrices();
  }

  getDomains(domains) {
    this.setState({ domains });
  }

  addToCart(item) {
    const domain = item || this.state.domains[0];

    this.props.addProduct(domain);

    window.location.href = '/detalle-compra'; // TODO: state reducer has to do this
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
  prices: PropTypes.objectOf(PropTypes.object).isRequired,
  addProduct: PropTypes.func.isRequired,
  fetchPrices: PropTypes.func.isRequired,
};

function mapStateToProps({ domains: { zones, prices } }) {
  return {
    prices,
    zones,
  };
}

export default connect(mapStateToProps, {
  addProduct,
  fetchPrices,
})(DomainsCatalog);
