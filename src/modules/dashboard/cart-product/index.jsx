import React from 'react';
import PropTypes from 'prop-types';

import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function CartProduct(props) {
  let className = '';
  let iconName = '';
  let name = '';

  switch (props.info.get('category')) {
    case 'hosting':
      className = 'red';
      iconName = 'linearicon-drawer2';
      name = props.info.get('name');
      break;
    case 'domain':
      className = 'orange';
      iconName = 'linearicon-earth';
      name = props.info.get('domain');
      break;
    default:
      className = 'blue';
      iconName = 'linearicon-envelope';
      break;
  }

  return (
    <div className={`${styles.container} ${styles[className]}`}>
      <Hexagon color={className}>
        <i className={iconName} />
      </Hexagon>
      <div className={styles.info}>
        <div className={styles.product}>
          <span className={styles.title}>{name}</span>
          <span className={styles.period}>Anual</span>
        </div>
        <div>
          <span className={styles.currency}>S/</span>
          <span className={styles.price}>197.00</span>
        </div>
      </div>
      <button className={styles.close}>
        <i className="linearicon-cross" />
      </button>
    </div>
  );
}

CartProduct.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

export default CartProduct;
