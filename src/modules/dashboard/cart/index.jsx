import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormButton from '../../../components/form-button';
import CartProduct from '../cart-product';
import CartPackage from '../cart-package';

import {
  closeCart,
  deleteItem,
  deleteItemFromBackend,
} from '../../../reducers/cart/actions';

import styles from './styles.css';

class Cart extends Component {
  constructor(props, context) {
    super(props, context);

    this.goToPaymentDetails = this.goToPaymentDetails.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showPackages = this.showPackages.bind(this);
  }

  deleteItem(item) {
    this.props.deleteItem(item);
    this.props.deleteItemFromBackend(item);
  }

  goToPaymentDetails() {
    const url = '/compra';
    this.context.router.history.push(url);
  }

  showPackages(item) {
    const url = `/detalle-producto/${item}/paquetes`;
    this.props.closeCart();
    this.context.router.history.push(url);
  }

  render() {
    const className = (this.props.cartInfo.isOpen)
      ? `${styles.container} ${styles.isOpen}`
      : styles.container;

    const buttonClass = (this.props.cartInfo.items.size > 0)
      ? styles.pay
      : `${styles.pay} ${styles.disabled}`;

    return (
      <aside className={className}>
        <div className={styles.header}>
          <span>Carrito de compras</span>
          <i
            className="linearicon-arrow-right5"
            onClick={() => this.props.closeCart()}
            aria-hidden
          />
        </div>
        <div className={styles.body}>
          {(this.props.cartInfo.items.size === 0 &&
            <div className={styles.info}>El carrito está vacío.</div>)}
          {(this.props.cartInfo.items.size > 0 &&
            this.props.cartInfo.items.entrySeq().map((data) => {
              const key = data[0];
              const item = data[1];
              if (item.type === 'product') {
                return (<CartProduct
                  key={key}
                  itemId={key}
                  info={item}
                  deleteItem={this.deleteItem}
                  showPackages={this.showPackages}
                />);
              }

              return (<CartPackage
                key={key}
                itemId={key}
                info={item}
                deleteItem={this.deleteItem}
              />);
            })
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.total}>
            <span className={styles.text}>Total:</span>
            <div>
              <span>{this.props.cartInfo.currencySymbol}</span>
              <span className={styles.amount}>{`${this.props.cartInfo.total}.00`}</span>
            </div>
          </div>
          <div className={buttonClass}>
            <FormButton
              callToAction="Pagar"
              onClick={this.goToPaymentDetails}
              disabled={this.props.cartInfo.items.size === 0}
            />
          </div>
        </div>
      </aside>
    );
  }
}

Cart.propTypes = {
  cartInfo: PropTypes.shape({
    currencySymbol: PropTypes.string,
    isOpen: PropTypes.bool,
    items: PropTypes.object,
    total: PropTypes.number,
  }).isRequired,
  closeCart: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  deleteItemFromBackend: PropTypes.func.isRequired,
};


Cart.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { cartInfo: state.get('cart') };
}

export default connect(mapStateToProps, {
  closeCart,
  deleteItem,
  deleteItemFromBackend,
})(Cart);
