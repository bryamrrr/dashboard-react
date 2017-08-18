import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DomainsWhois from '../domains-whois';

import Combo from '../../../../components/combo';

import { addProduct } from '../../../../reducers/cart/actions';

import styles from './styles.css';

class DomainsTable extends Component {
  constructor(props, context) {
    super(props, context);

    const domainsData = _.mapKeys(this.props.domains, 'countryProductId');
    console.log('domainsData', domainsData);

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

    console.log('domains', domains);

    this.state = {
      domains: _.mapKeys(domains, 'name'),
      domainPaneActive: true,
    };

    console.log(this.state.domains);

    this.changeSelected = this.changeSelected.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const domainsData = _.mapKeys(nextProps.domains, 'countryProductId');

    const domains = _.map(domainsData, (domain) => {
      const pricesData = nextProps.prices.get(domain.countryProductId);

      const prices = (pricesData)
      ? _.mapKeys(pricesData.prices.ALTA, 'periodSlug')
      : {};

      const selected = (Object.keys(prices).length > 0) ? prices['ano-1'] : {};

      return Object.assign({}, domain, {
        prices,
        selected,
      });
    });

    this.setState({ domains: _.mapKeys(domains, 'name') });
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

  changeTab(tab) {
    if (tab === 'whois') {
      this.setState({ domainPaneActive: false });
    } else {
      this.setState({ domainPaneActive: true });
    }
  }

  render() {
    const domainTabClass = (this.state.domainPaneActive)
    ? `${styles.tab} ${styles.active}`
    : styles.tab;

    const whoisTabClass = (!this.state.domainPaneActive)
    ? `${styles.tab} ${styles.active}`
    : styles.tab;

    return (
      <div className={styles.tabData}>
        <div className={styles.tabHeader}>
          <div
            className={domainTabClass}
            aria-hidden
            onClick={() => this.changeTab('domain')}
          >
            <span>Dominios</span>
            <div className={styles.clearBorder} />
          </div>
          <div
            className={whoisTabClass}
            aria-hidden
            onClick={() => this.changeTab('whois')}
          >
            <span>Whois</span>
            <div className={styles.clearBorder} />
          </div>
        </div>
        {
          this.state.domainPaneActive &&
          <div className={styles.tabContent}>
            {_.map(this.state.domains, (domain) => {
              const className = (domain.available)
                ? ''
                : styles.disabled;

              return (
                <div
                  className={`${className} ${styles.tabRow}`}
                  key={domain.name}
                >
                  <div className={styles.tabColumn}>
                    <span>{domain.name}</span>
                  </div>
                  <div className={styles.tabColumn}>
                    {(
                      domain.available && Object.keys(domain.prices).length > 0 &&
                      domain.selected &&
                      <div className={styles.comboContainer}>
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
                          noPlaceholder="true"
                        />
                      </div>
                    )}
                  </div>
                  <div className={`${styles.tabColumn} ${styles.price}`}>
                    {(domain.available && domain.selected &&
                      `${domain.selected.currencySymbol} ${domain.selected.price}`
                    )}
                    {(!domain.available &&
                      <a
                        className={styles.tabLink}
                        onClick={() => this.changeTab('whois')}
                        aria-hidden
                      >
                        whois
                      </a>
                    )}
                  </div>
                  <div className={styles.tabColumn}>
                    {
                      ((domain.available && domain.selected &&
                        <button
                          className={styles.addCart}
                          onClick={() => this.addToCart(domain)}
                        >
                          {this.props.strings.others.addToCart}
                        </button>)
                      || (!domain.available &&
                        <span>{this.props.strings.domainsCatalog.notAvailable}</span>
                      ))
                    }
                  </div>
                </div>
              );
            })}
          </div>
        }
        {
          !this.state.domainPaneActive &&
          <div className={styles.tabContent}>
            <DomainsWhois />
          </div>
        }
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
