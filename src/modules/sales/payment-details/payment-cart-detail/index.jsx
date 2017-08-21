import React from 'react';
import PropTypes from 'prop-types';

import PaymentCartProduct from '../payment-cart-product';
import PaymentCartPackage from '../payment-cart-package';

import styles from './styles.css';

function PaymentCartDetail(props) {
  return (
    <div className={styles.container}>
      {(props.cartInfo.items.size > 0 &&
        props.cartInfo.items.entrySeq().map((data) => {
          const key = data[0];
          const item = data[1];
          if (item.type === 'product') {
            return (
              <PaymentCartProduct
                key={key}
                info={item}
              />
            );
          }
          return (
            <PaymentCartPackage
              key={key}
              info={item}
            />
          );
        })
      )}
    </div>
  );
}

PaymentCartDetail.propTypes = {
  cartInfo: PropTypes.shape({
    currencySymbol: PropTypes.string,
    isOpen: PropTypes.bool,
    items: PropTypes.object,
    total: PropTypes.number,
  }).isRequired,
};

export default PaymentCartDetail;
