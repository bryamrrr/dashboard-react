import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';

import { setRoute } from '../../../../reducers/routes/actions';
import { addProduct } from '../../../../reducers/cart/actions';

import styles from './styles.css';

class HostingCatalog extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  componentWillMount() {
    this.props.setRoute({ title: 'Catálogo' }, { title: 'Hosting' });
  }

  addToCart(item) {
    this.props.addProduct(item, 'hosting');
  }

  render() {
    return (
      <div className={styles.container}>
        <CatalogCard addToCart={this.addToCart} />
        <CatalogCard addToCart={this.addToCart} />
        <CatalogCard addToCart={this.addToCart} />
      </div>
    );
  }
}

HostingCatalog.propTypes = {
  addProduct: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps({ hosting }) {
  return { hosting };
}

export default connect(mapStateToProps, { setRoute, addProduct })(HostingCatalog);
