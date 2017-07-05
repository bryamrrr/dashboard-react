import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';
import { addProduct } from '../../../../reducers/cart/actions';
import { fetchProducts } from '../../../../reducers/hostings/actions';

import styles from './styles.css';

class HostingCatalog extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);

    this.state = { fetchingProducts: true };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'Catálogo' }, { title: 'Hosting' });

    if (this.props.hostings.products.size > 0) return this.setState({ fetchingProducts: false });

    await this.props.fetchProducts();
    return this.setState({ fetchingProducts: false });
  }

  addToCart(item) {
    this.props.addProduct(item, 'hosting');
  }

  render() {
    return (
      <div className={styles.container}>
        {(
          (this.state.fetchingProducts && <LoadingSpin />)
          ||
          (!this.state.fetchingProducts && this.props.hostings.get('products').valueSeq().map(product =>
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
    PropTypes.object,
  ])).isRequired,
  addProduct: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { hostings: state.get('hostings') };
}

export default connect(mapStateToProps, {
  setRoute,
  addProduct,
  fetchProducts,
})(HostingCatalog);
