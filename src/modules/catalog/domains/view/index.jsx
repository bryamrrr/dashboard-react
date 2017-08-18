import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { connect } from 'react-redux';

import DomainSearch from '../../../../components/domain-search';
import Info from '../../../../components/info';
import LoadingIcon from '../../../../components/loading-icon';
import DomainsTable from '../domains-table';

import { fetchProductFromBackend } from '../../../../reducers/cart/actions';
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
    this.props.setRoute({ title: 'catalog' }, { title: 'domains' });
    if (this.props.prices.size === 0) this.props.fetchPrices();
  }

  getDomains(domains) {
    this.setState({ domains });
  }

  addToCart() {
    const domain = this.state.domains[0];
    const pricesData = this.props.prices.get(domain.countryProductId);

    domain.prices = _.mapKeys(pricesData.prices.ALTA, 'periodSlug');
    domain.selected = domain.prices['ano-1'];

    const push = this.context.router.history.push;
    this.props.fetchProductFromBackend(domain, 'Dominio', push);
  }

  render() {
    const { domains } = this.state;
    let domain = '';
    let text = '';
    let type = 'info';
    let funcAddCart = '';

    if (domains && domains[0]) {
      domain = domains[0].name;
      if (domains[0].available) {
        text = this.props.strings.domainsCatalog.infoSuccess;
        type = 'success';
        funcAddCart = this.addToCart;
      } else {
        text = this.props.strings.domainsCatalog.infoError;
        type = 'warning';
        funcAddCart = '';
      }
    }

    if (this.props.prices.size === 0 || _.isEmpty(this.props.zones)) {
      return <LoadingIcon />;
    }

    return (
      <div>
        <h2 className={styles.title}>{this.props.strings.domainsCatalog.title}</h2>
        <DomainSearch
          getDomains={this.getDomains}
        />
        {(domains &&
          <Info
            text={text}
            type={type}
            domain={domain}
            addToCart={funcAddCart}
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
  fetchProductFromBackend: PropTypes.func.isRequired,
  fetchPrices: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  zones: PropTypes.objectOf(PropTypes.object).isRequired,
};

DomainsCatalog.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    prices: state.get('prices').get('domains'),
    zones: state.get('zones'),
    cart: state.get('cart'),
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps, {
  fetchProductFromBackend,
  fetchPrices,
  setRoute,
})(DomainsCatalog);
