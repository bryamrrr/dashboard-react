import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoadingSpin from '../../../../components/loading-spin';
import Combo from '../../../../components/combo';

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

  changeSelected(period) {
    console.log('algo cambió en el combo', period);
    console.log(this);
    // const newDomainData = _.extend({}, this.state.domains);
    // newDomainData[trackItem].selected = period;

    // this.setState({ domains: newDomainData });
  }

  render() {
    const { product } = this.state;

    const name = (product.get('domain'))
      ? product.get('domain')
      : product.get('name');

    let category = '';
    switch (product.get('category')) {
      case 'domain':
        category = 'Dominio';
        break;
      case 'hosting':
        category = 'Hosting';
        break;
      case 'mail':
        category = 'Mail';
        break;
      default:
        category = 'Producto';
    }

    return (
      <div>
        <section className={styles.productInfo}>
          <article className={styles.product}>
            <div className={styles.productHeader}>
              <h3>{category}</h3>
            </div>
            <div className={styles.productBody}>
              <span>{name}</span>
            </div>
          </article>

          <div className={styles.period}>
            <p>Periodo seleccionado: {product.get('selected').period}</p>
            <Combo
              placeholder="Periodo"
              options={product.get('prices')}
              selected={product.get('selected')}
              config={{
                key: 'period',
                value: 'period',
                label: 'period',
              }}
              changeSelected={this.changeSelected}
            />
          </div>

          <div className={styles.price}>
            {`${product.get('selected').currencySymbol} ${product.get('selected').price}.00`}
          </div>
        </section>

        <div>
          {(
            (this.state.fetchingPackages && <LoadingSpin />)
            ||
            (!this.state.fetchingPackages && <div>
              <h2>Complementa tu compra:</h2>
              {product.get('packages').valueSeq().map(packageData =>
                <section key={packageData.id}>
                  {packageData.remainingProducts.map(productData =>
                    <article key={productData.id}>
                      <span>{JSON.stringify(productData)}</span>
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
