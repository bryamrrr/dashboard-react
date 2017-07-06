import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormButton from '../../../components/form-button';
import CartProduct from '../cart-product';
import CartPackage from '../cart-package';

import { closeCart } from '../../../reducers/cart/actions';

import styles from './styles.css';

function Cart(props) {
  const className = (props.cartInfo.isOpen)
    ? `${styles.container} ${styles.isOpen}`
    : styles.container;

  return (
    <aside className={className}>
      <div className={styles.header}>
        <span>Carrito de compras</span>
        <i
          className="linearicon-arrow-right5"
          onClick={() => props.closeCart()}
          aria-hidden
        />
      </div>
      <div className={styles.body}>
        {(props.cartInfo.items.size === 0 &&
          <div className={styles.info}>El carrito está vacío.</div>)}
        {(props.cartInfo.items.size > 0 &&
          props.cartInfo.items.entrySeq().map((data) => {
            const key = data[0];
            const item = data[1];
            if (item.get('type') === 'product') return <CartProduct key={key} info={item} />;
            return <CartPackage key={key} info={item} />;
          })
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.text}>Total:</span>
          <div>
            <span>{props.cartInfo.currencySymbol}</span>
            <span className={styles.amount}>{`${props.cartInfo.total}.00`}</span>
          </div>
        </div>
        <div className={styles.pay}>
          <FormButton
            callToAction="Pagar"
          />
        </div>
      </div>
    </aside>
  );
}

Cart.propTypes = {
  cartInfo: PropTypes.shape({
    currencySymbol: PropTypes.string,
    isOpen: PropTypes.bool,
    items: PropTypes.object,
    total: PropTypes.number,
  }).isRequired,
  closeCart: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { cartInfo: state.get('cart') };
}

export default connect(mapStateToProps, { closeCart })(Cart);
