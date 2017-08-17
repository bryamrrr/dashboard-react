import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';
import LoadingIcon from '../../../../components/loading-icon';

import { setRoute } from '../../../../reducers/routes/actions';
import { addProduct } from '../../../../reducers/cart/actions';
import { showToaster } from '../../../../reducers/toaster/actions';
import {
  fetchHostings,
  fetchHostingPrices,
} from '../../../../reducers/hostings/actions';

import styles from './styles.css';

class HostingCatalog extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);

    this.state = { fetchingHostings: true };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'catalog' }, { title: 'hosting' });

    if (this.props.hostings.size > 0) return this.setState({ fetchingHostings: false });

    await this.props.fetchHostings();
    await this.props.fetchHostingPrices();
    return this.setState({ fetchingHostings: false });
  }

  addToCart(item) {
    this.props.addProduct(item, 'Hosting');
    this.props.showToaster('success', this.props.strings.cart.addItem);
  }

  render() {
    return (
      <div className={styles.container}>
        {(
          (this.state.fetchingHostings && <LoadingIcon />)
          ||
          (!this.state.fetchingHostings && this.props.hostings.valueSeq().map(product =>
            <CatalogCard
              key={product.countryProductId}
              addToCart={this.addToCart}
              info={product}
            />,
          ))
        )}
      </div>
    );
  }
}

HostingCatalog.propTypes = {
  hostings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  addProduct: PropTypes.func.isRequired,
  fetchHostingPrices: PropTypes.func.isRequired,
  showToaster: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    hostings: state.get('prices').get('hostings'),
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps, {
  setRoute,
  addProduct,
  fetchHostings,
  fetchHostingPrices,
  showToaster,
})(HostingCatalog);
