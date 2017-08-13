import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoadingIcon from '../../../../components/loading-icon';
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

    this.state = {
      fetchingPackages: true,
      itemId: this.context.router.route.match.params.productId,
    };

    this.changeSelected = this.changeSelected.bind(this);
  }

  async componentWillMount() {
    const product = this.props.items.get(this.state.itemId);
    if (product && product.packages) return this.setState({ fetchingPackages: false });

    if (product && !product.packages) {
      const countryProductId = product.get('countryProductId');
      await this.props.fetchPackages(this.state.itemId, countryProductId);
      return this.setState({ fetchingPackages: false });
    }

    return undefined;
  }

  componentDidMount() {
    setTimeout(() =>
      this.props.setRoute({ title: 'Detalle del producto' }, { title: 'Paquetes' })
    , 600);
  }

  async componentWillReceiveProps(nextProps) {
    const product = nextProps.items.get(this.state.itemId);
    if (product && !product.packages) {
      const countryProductId = product.get('countryProductId');
      await this.props.fetchPackages(this.state.itemId, countryProductId);
      return this.setState({ fetchingPackages: false });
    }

    return undefined;
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
    let product = {};

    if (this.props.items) {
      product = this.props.items.get(this.state.itemId);
    }

    const name = product.name || '';
    let category = product.category || '';

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

    if (this.state.fetchingPackages) return <LoadingIcon />;

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
              <p>Periodo seleccionado: {product.selected.periodName}</p>
              <Combo
                placeholder="Periodo"
                options={product.prices}
                selected={product.selected}
                config={{
                  key: 'periodSlug',
                  value: 'periodSlug',
                  label: 'periodName',
                }}
                changeSelected={this.changeSelected}
              />
            </div>

            <div className={styles.price}>
              {`${product.selected.currencySymbol} ${product.selected.price}`}
            </div>
          </div>
        </section>
        <div className={styles.packages}>
          <h2>Te puede interesar:</h2>
          {(product.packages[product.selected.periodSlug].packagePeriod.length > 0
            && product.packages[product.selected.periodSlug].packagePeriod.map((packageData) => {
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
            })
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
