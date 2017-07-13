import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoadingSpin from '../../../../components/loading-spin';
import Combo from '../../../../components/combo';
import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';

import { setRoute } from '../../../../reducers/routes/actions';
import {
  addPackage,
  fetchPackages,
  selectPeriod,
} from '../../../../reducers/cart/actions';

import styles from './styles.css';

class ProductDetails extends Component {
  constructor(props, context) {
    super(props, context);

    const productId = this.context.router.route.match.params.productId;
    this.state = {
      fetchingPackages: true,
      product: this.props.items.get(productId),
      itemId: this.context.router.route.match.params.productId,
    };

    this.changeSelected = this.changeSelected.bind(this);
  }

  async componentWillMount() {
    if (this.state.product.packages) return this.setState({ fetchingPackages: false });

    const productId = this.props.items.get(this.state.itemId).get('productId');
    await this.props.fetchPackages(this.state.itemId, productId);
    return this.setState({ fetchingPackages: false });
  }

  componentDidMount() {
    setTimeout(() =>
      this.props.setRoute({ title: 'Detalle del producto' }, { title: 'Paquetes' })
    , 600);
  }

  componentWillReceiveProps(nextProps) {
    // const productId = this.state.product.get('productId');
    const product = nextProps.items.get(this.state.itemId);
    if (product) this.setState({ product });
  }

  addToCart(packageData) {
    // It should sends package data with current product data
    this.props.addPackage(this.state.itemId, packageData);
    const url = '/catalogo/dominios';
    this.context.router.history.push(url);
  }

  changeSelected(period) {
    this.props.selectPeriod(this.state.itemId, period);
  }

  render() {
    const { product } = this.state;

    const name = (product.get('domain'))
      ? product.get('domain')
      : product.get('name');

    let category = product.get('category');
    let icon = '';
    let color = '';
    switch (category) {
      case 'Dominio':
        icon = 'linearicon-earth';
        color = 'orange';
        break;
      case 'Hosting':
        icon = 'linearicon-drawer2';
        color = 'red';
        break;
      case 'Mail':
        icon = 'linearicon-envelope';
        color = 'blue';
        break;
      default:
        category = 'Producto';
    }

    return (
      <div>
        <section className={styles.productInfo}>
          <article className={styles.product}>
            <Hexagon color={color}>
              <i className={icon} />
            </Hexagon>
            <div className={styles.productName}>
              <span className={styles[color]}>{category}</span>
              <h3>{name}</h3>
            </div>
          </article>

          <div className={styles.productDetail}>
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
          </div>
        </section>

        {(
          (this.state.fetchingPackages && <LoadingSpin />)
          ||
          (!this.state.fetchingPackages && <div className={styles.packages}>
            <h2>Te puede interesar:</h2>
            {product.get('packages').valueSeq().map((packageData) => {
              const price = packageData.prices[0].price;
              const currencySymbol = packageData.prices[0].currencySymbol;
              return (
                <section key={packageData.id} className={styles.packageContainer}>
                  <article className={styles.item}>
                    <div className={styles.amount}>{`${currencySymbol} ${price}.00`}</div>
                    <div className={styles.itemInfo}>
                      <i className="linearicon-papers" />
                      <div className={styles.packageDetail}>
                        <p>Llévate tu producto junto con:</p>
                        {packageData.remainingProducts.map(productData =>
                          <a key={productData.id}>
                            <span>{productData.name}</span>
                          </a>,
                        )}
                      </div>
                    </div>
                    <FormButton
                      callToAction="Agregar al carrito"
                      includeIcon="linearicon-cart"
                      onClick={() => this.addToCart(packageData)}
                    />
                  </article>
                </section>
              );
            })}
          </div>)
        )}
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
  addPackage: PropTypes.func.isRequired,
  selectPeriod: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
};

ProductDetails.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    items: state.get('cart').items,
  };
}

export default connect(mapStateToProps, {
  setRoute,
  addPackage,
  fetchPackages,
  selectPeriod,
})(ProductDetails);
