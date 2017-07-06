import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { toggleCart } from '../../../reducers/cart/actions';

import styles from './styles.css';

class CartResume extends Component {
  constructor(props) {
    super(props);

    this.state = { addingProduct: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.items.size > this.props.cart.items.size) {
      this.setState({ addingProduct: true });

      setTimeout(() => {
        this.setState({ addingProduct: false });
      }, 600);
    }
  }

  render() {
    const className = (this.state.addingProduct)
      ? `${styles.cart} ${styles.addItem}`
      : styles.cart;

    return (
      <div
        className={styles.container}
        onClick={() => this.props.toggleCart()}
        aria-hidden
      >
        <div className={className} style={{ backgroundImage: `url(${this.props.context}/images/shopping-cart.png)` }} />
        <div className={styles.counter}>
          <span>{ this.props.cart.items.size }</span>
        </div>
      </div>
    );
  }
}

CartResume.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  cart: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.get('context'),
    cart: state.get('cart'),
  };
}

export default connect(mapStateToProps, { toggleCart })(CartResume);
