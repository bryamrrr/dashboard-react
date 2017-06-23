import React, { Component } from 'react';

import { connect } from 'react-redux';

import DomainSearch from '../../../../components/domain-search';
import Info from '../../../../components/info';
import DomainsTable from '../domains-table';

import { addProduct } from '../../../../reducers/cart/actions';

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

  getDomains(domains) {
    this.setState({ domains });
  }

  addToCart(item) {
    const domain = item || this.state.domains[0];

    addProduct(domain);

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
            domains={{}}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps({ catalog }) {
  return { zones: catalog.zones };
}

export default connect(mapStateToProps, { addProduct })(DomainsCatalog);
