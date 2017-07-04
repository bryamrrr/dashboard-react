import React from 'react';

import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function CartPackage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>Prom Host + Dom</div>
        <button className={styles.close}>
          <i className="linearicon-cross" />
        </button>
        <div className={styles.item}>
          <Hexagon color="orange">
            <i className="linearicon-earth" />
          </Hexagon>
          <div className={styles.itemName}>midominio.pe</div>
        </div>
        <div className={styles.item}>
          <Hexagon color="red">
            <i className="linearicon-drawer2" />
          </Hexagon>
          <div className={styles.itemName}>hosti 100</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.period}>Anual</div>
          <div>
            <span className={styles.currency}>S/</span>
            <span className={styles.price}>320.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPackage;
