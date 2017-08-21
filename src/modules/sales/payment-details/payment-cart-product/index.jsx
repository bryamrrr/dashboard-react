import React from 'react';
import PropTypes from 'prop-types';

import Hexagon from '../../../../components/hexagon';

import styles from './styles.css';

function PaymentCartProduct(props) {
  let className = '';
  let iconName = '';
  let name = '';

  switch (props.info.category) {
    case 'Hosting':
      className = 'red';
      iconName = 'linearicon-drawer2';
      name = props.info.name;
      break;
    case 'Dominio':
      className = 'orange';
      iconName = 'linearicon-earth';
      name = props.info.name;
      break;
    default:
      className = 'blue';
      iconName = 'linearicon-envelope';
      name = props.info.name;
      break;
  }

  const parsePrice = (parseFloat(props.info.selected.price)).toFixed(2);

  return (
    <div
      className={`${styles.container} ${styles[className]}`}
    >
      <Hexagon color={className}>
        <i className={iconName} />
      </Hexagon>
      <div className={styles.product}>
        <span className={styles.title}>{name}</span>
        <span className={styles.period}>
          {props.info.selected.periodName}
        </span>
      </div>
      <div className={styles.priceContainer}>
        <span className={styles.currency}>
          {props.info.selected.currencySymbol}
        </span>
        <span className={styles.price}>
          {parsePrice}
        </span>
      </div>
    </div>
  );
}

PaymentCartProduct.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

export default PaymentCartProduct;
