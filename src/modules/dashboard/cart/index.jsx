import React from 'react';

import FormButton from '../../../components/form-button';

import styles from './styles.css';

function Cart() {
  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        Header
      </div>
      <div className={styles.body}>
        Body
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          S/ 0.00
        </div>
        <div className={styles.pay}>
          <FormButton
            callToAction="Pagar"
          />
        </div>
      </div>
    </aside>
  );
}

export default Cart;
