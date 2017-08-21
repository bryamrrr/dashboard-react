import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Hexagon from '../../../../components/hexagon';

import styles from './styles.css';

function PaymentCartPackage(props) {
  const parsePrice = (parseFloat(props.info.selected.price)).toFixed(2);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>{props.info.name}</div>
        {_.map(props.info.products, (product, index) => {
          const key = `${product.countryProductId}-${index}`;

          let category = product.category;
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
              icon = 'linearicon-drawer2';
              color = 'orange';
              category = 'Producto';
          }
          return (
            <div key={key} className={styles.item}>
              <Hexagon color={color}>
                <i className={icon} />
              </Hexagon>
              <div className={styles.itemName}>
                {product.name || product.domain || product.productName}
              </div>
            </div>
          );
        })}
        <div className={styles.footer}>
          <div className={styles.period}>{props.info.selected.periodName}</div>
          <div>
            <span className={styles.currency}>{props.info.selected.currencySymbol}</span>
            <span className={styles.price}>{parsePrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

PaymentCartPackage.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

export default PaymentCartPackage;
