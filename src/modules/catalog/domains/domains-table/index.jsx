import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Combo from '../../../../components/combo';

import { addProduct } from '../../../../reducers/cart/actions';

import styles from './styles.css';

class DomainsTable extends Component {
  constructor(props, context) {
    super(props, context);

    const domainsData = _.mapKeys(this.props.domains.slice(1), 'countryProductId');

    const domains = _.map(domainsData, (domain) => {
      const pricesData = this.props.prices.get(domain.countryProductId);

      const prices = (pricesData)
        ? _.mapKeys(pricesData.prices.ALTA, 'periodSlug')
        : {};

      const selected = (Object.keys(prices).length > 0) ? prices['ano-1'] : {};

      return Object.assign({}, domain, {
        prices,
        selected,
      });
    });

    this.state = { domains: _.mapKeys(domains, 'name') };

    this.changeSelected = this.changeSelected.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(domain) {
    this.props.addProduct(domain, 'Dominio');

    const url = `/detalle-producto/item${this.props.cart.count + 1}/paquetes`;
    this.context.router.history.push(url);
  }

  changeSelected(periodSlug, trackItem) {
    const newDomainData = _.extend({}, this.state.domains);
    newDomainData[trackItem].selected = periodSlug;

    this.setState({ domains: newDomainData });
  }

  render() {
    return (
      <div className="table-container">
        <table>
          <tbody>
            {_.map(this.state.domains, (domain) => {
              const className = (domain.available)
                ? ''
                : styles.disabled;

              return (
                <tr
                  className={className}
                  key={domain.name}
                >
                  <td>
                    <span>{domain.name}</span>
                  </td>
                  <td>
                    {(
                      domain.available && Object.keys(domain.prices).length > 0 &&
                      <Combo
                        placeholder="Periodo"
                        selected={domain.selected}
                        config={{
                          key: 'periodSlug',
                          value: 'periodSlug',
                          label: 'periodName',
                        }}
                        changeSelected={this.changeSelected}
                        trackItem={domain.name}
                        options={domain.prices}
                      />
                    )}
                  </td>
                  <td>
                    {(domain.available && `${domain.selected.currencySymbol} ${domain.selected.price}`)}
                  </td>
                  <td>
                    {
                      ((domain.available &&
                        <span
                          className={styles.link}
                          onClick={() => this.addToCart(domain)}
                          aria-hidden
                        >
                          {this.props.strings.others.addToCart}
                        </span>)
                      || (!domain.available &&
                        <span>{this.props.strings.domainsCatalog.notAvailable}</span>
                      ))
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

DomainsTable.propTypes = {
  addProduct: PropTypes.func.isRequired,
  domains: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.shape({ count: PropTypes.number }).isRequired,
  prices: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

DomainsTable.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    cart: state.get('cart'),
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps, { addProduct })(DomainsTable);
