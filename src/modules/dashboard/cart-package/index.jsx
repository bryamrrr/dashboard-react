import React from 'react';
import PropTypes from 'prop-types';

import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function CartPackage(props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>{props.info.get('name')}</div>
        <button
          className={styles.close}
          onClick={() => props.deleteItem(props.itemId)}
        >
          <i className="linearicon-cross" />
        </button>
        {props.info.get('products').valueSeq().map((product, index) => {
          const key = `${product.get('id')}-${index}`;

          let category = product.get('category');
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
          return (
            <div key={key} className={styles.item}>
              <Hexagon color={color}>
                <i className={icon} />
              </Hexagon>
              <div className={styles.itemName}>{product.get('name') || product.get('domain')}</div>
            </div>
          );
        })}
        <div className={styles.footer}>
          <div className={styles.period}>{props.info.get('selected').period}</div>
          <div>
            <span className={styles.currency}>{props.info.get('selected').currencySymbol}</span>
            <span className={styles.price}>{`${props.info.get('selected').price}.00`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CartPackage.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  deleteItem: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default CartPackage;
