import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';
import { fetchPackages } from '../../../../reducers/cart/actions';

import styles from './styles.css';

class ProductDetails extends Component {
  constructor(props, context) {
    super(props, context);

    const productId = this.context.router.route.match.params.productId;
    this.state = {
      fetchingPackages: true,
      product: this.props.items.get(productId),
    };
  }

  async componentWillMount() {
    if (this.state.product.packages) return this.setState({ fetchingPackages: false });

    await this.props.fetchPackages(this.state.product.get('productId'));
    return this.setState({ fetchingPackages: false });
  }

  componentDidMount() {
    setTimeout(() =>
      this.props.setRoute({ title: 'Detalle del producto' }, { title: 'Paquetes' })
    , 600);
  }

  componentWillReceiveProps(nextProps) {
    const productId = this.state.product.get('productId');
    const product = nextProps.items.get(productId);
    if (product) this.setState({ product });
  }

  addToCart(packageData) {
    // It should sends package data with current product data
    console.log(this);
    console.log('se quiere enviar la data', packageData);
  }

  render() {
    return (
      <div>
        <h1>Paquetes</h1>
        <div>
          {(
            (this.state.fetchingPackages && <LoadingSpin />)
            ||
            (!this.state.fetchingPackages && <div>
              <h2>Paquetes encontrados</h2>
              {this.state.product.get('packages').valueSeq().map(packageData =>
                <section key={packageData.id}>
                  {packageData.remainingProducts.map(product =>
                    <article key={product.id}>
                      <span>{JSON.stringify(product)}</span>
                    </article>,
                  )}
                  <span
                    className={styles.link}
                    onClick={() => this.addToCart(packageData)}
                    aria-hidden
                  >
                    Agregar al carrito
                  </span>
                </section>,
              )}
            </div>)
          )}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  items: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  fetchPackages: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
};

ProductDetails.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { items: state.get('cart').items };
}

export default connect(mapStateToProps, {
  setRoute,
  fetchPackages,
})(ProductDetails);
