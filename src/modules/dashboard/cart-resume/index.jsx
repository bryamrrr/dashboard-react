import React from 'react';

import styles from './styles.css';

function CartResume() {
  return (
    <div className={styles.container}>
      <i className="linearicon-cart" />
      <div className={styles.counter}>
        0
      </div>
    </div>
  );
}

export default CartResume;
