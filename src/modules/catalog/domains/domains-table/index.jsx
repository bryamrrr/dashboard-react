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

    const domainsData = _.mapKeys(this.props.domains.slice(0), 'productId'); // FIXME remove first item from this array (slice 1)
    const domains = _.map(domainsData, (domain) => {
      const pricesData = this.props.prices[domain.zone.substring(1)];

      const prices = (pricesData)
        ? _.mapKeys(pricesData.prices.buy, 'period')
        : {};

      return Object.assign({}, domain, {
        prices,
        selected: (Object.keys(prices).length > 0) ? prices.Anual : {},
      });
    });

    this.state = { domains: _.mapKeys(domains, 'domain') };

    this.changeSelected = this.changeSelected.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(domain) {
    this.props.addProduct(domain, 'domain');

    const url = `/detalle-producto/${domain.productId}/paquetes`;
    this.context.router.history.push(url);
  }

  changeSelected(period, trackItem) {
    const newDomainData = _.extend({}, this.state.domains);
    newDomainData[trackItem].selected = period;

    this.setState({ domains: newDomainData });
  }

  render() {
    return (
      <table>
        <tbody>
          {_.map(this.state.domains, (domain) => {
            const className = (domain.available)
              ? ''
              : styles.disabled;

            return (
              <tr
                className={className}
                key={domain.domain}
              >
                <td>
                  <span>{domain.domain}</span>
                </td>
                <td>
                  {(
                    domain.available && Object.keys(domain.prices).length > 0 &&
                    <Combo
                      placeholder="Periodo"
                      options={domain.prices} // FIXME Has to be periodId instead of period
                      selected={domain.selected}
                      config={{
                        key: 'period',
                        value: 'period',
                        label: 'period',
                      }}
                      changeSelected={this.changeSelected}
                      trackItem={domain.domain}
                    />
                  )}
                </td>
                <td>
                  {(domain.available && `${domain.selected.currencySymbol} ${domain.selected.price}.00`)}
                </td>
                <td>
                  {
                    ((domain.available &&
                      <span
                        className={styles.link}
                        onClick={() => this.addToCart(domain)}
                        aria-hidden
                      >
                        Agregar al carrito
                      </span>)
                    || (!domain.available && <span>No disponible</span>))
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

DomainsTable.propTypes = {
  addProduct: PropTypes.func.isRequired,
  domains: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.objectOf(PropTypes.object).isRequired,
};

DomainsTable.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, { addProduct })(DomainsTable);
