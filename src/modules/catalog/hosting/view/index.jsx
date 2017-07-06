import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';
import { addProduct } from '../../../../reducers/cart/actions';
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
    this.props.setRoute({ title: 'Catálogo' }, { title: 'Hosting' });

    if (this.props.hostings.products.size > 0) return this.setState({ fetchingHostings: false });

    await this.props.fetchHostings();
    return this.setState({ fetchingHostings: false });
  }

  componentDidMount() {
    // If store hasn't domain prices, then we make a request
    if (this.props.hostings.prices.size === 0) this.props.fetchHostingPrices();
  }

  addToCart(item) {
    this.props.addProduct(item, 'hosting');
  }

  render() {
    return (
      <div className={styles.container}>
        {(
          (this.state.fetchingHostings && <LoadingSpin />)
          ||
          (!this.state.fetchingHostings && this.props.hostings.get('products').valueSeq().map(product =>
            <CatalogCard
              key={product.id}
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
  fetchHostings: PropTypes.func.isRequired,
  fetchHostingPrices: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { hostings: state.get('hostings') };
}

export default connect(mapStateToProps, {
  setRoute,
  addProduct,
  fetchHostings,
  fetchHostingPrices,
})(HostingCatalog);
