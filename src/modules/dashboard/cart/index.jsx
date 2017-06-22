import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormButton from '../../../components/form-button';

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
        <div className={styles.info}>El carrito está vacío.</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.text}>Total:</span>
          <div>
            <span>S/</span>
            <span className={styles.amount}>0.00</span>
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
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  closeCart: PropTypes.func.isRequired,
};

function mapStateToProps({ cart }) {
  return { cartInfo: cart };
}

export default connect(mapStateToProps, { closeCart })(Cart);
