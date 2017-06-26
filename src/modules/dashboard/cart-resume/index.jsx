import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { toggleCart } from '../../../reducers/cart/actions';

import styles from './styles.css';

function CartResume(props) {
  return (
    <div
      className={styles.container}
      onClick={() => props.toggleCart()}
      aria-hidden
    >
      <div className={styles.cart} style={{ backgroundImage: `url(${props.context}/images/shopping-cart.png)` }} />
      <div className={styles.counter}>
        0
      </div>
    </div>
  );
}

CartResume.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
};

function mapStateToProps({ context }) {
  return { context };
}

export default connect(mapStateToProps, { toggleCart })(CartResume);
