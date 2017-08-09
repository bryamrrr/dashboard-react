import React from 'react';
import PropTypes from 'prop-types';

import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function CartProduct(props) {
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

  return (
    <div
      className={`${styles.container} ${styles[className]}`}
      onClick={() => props.showPackages(props.itemId)}
      aria-hidden
    >
      <Hexagon color={className}>
        <i className={iconName} />
      </Hexagon>
      <div className={styles.info}>
        <div className={styles.product}>
          <span className={styles.title}>{name}</span>
          <span className={styles.period}>
            {props.info.selected.periodName}
          </span>
        </div>
        <div>
          <span className={styles.currency}>
            {props.info.selected.currencySymbol}
          </span>
          <span className={styles.price}>
            {`${props.info.selected.price}`}
          </span>
        </div>
      </div>
      <button
        className={styles.close}
        onClick={(e) => {
          e.stopPropagation();
          props.deleteItem(props.itemId);
        }}
      >
        <i className="linearicon-cross" />
      </button>
    </div>
  );
}

CartProduct.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  deleteItem: PropTypes.func.isRequired,
  showPackages: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default CartProduct;
