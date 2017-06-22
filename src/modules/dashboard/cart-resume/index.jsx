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
      <i className="linearicon-cart" />
      <div className={styles.counter}>
        0
      </div>
    </div>
  );
}

CartResume.propTypes = {
  toggleCart: PropTypes.func.isRequired,
};

export default connect(null, { toggleCart })(CartResume);
