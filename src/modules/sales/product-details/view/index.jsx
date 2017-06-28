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
      product: this.props.items[productId],
    };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'Detalle del producto' }, { title: 'Paquetes' });

    if (this.state.product.packages) return this.setState({ fetchingPackages: false });

    await this.props.fetchPackages(this.state.product.productId);
    return this.setState({ fetchingPackages: false });
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
              {this.state.product.packages.map(packageData =>
                <section key={packageData.remainingProducts[0].id}>
                  {packageData.remainingProducts.map(product =>
                    <article>
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
  items: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchPackages: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
};

ProductDetails.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps({ cart: { items } }) {
  return { items };
}

export default connect(mapStateToProps, {
  setRoute,
  fetchPackages,
})(ProductDetails);
