import React from 'react';

import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function CartItem() {
  return (
    <div className={styles.container}>
      <Hexagon color="red">
        <i className="linearicon-drawer2" />
      </Hexagon>
      <div>
        <span className={styles.title}>HOSTI 100</span>
        <span className={styles.period}>Anual</span>
      </div>
      <div>
        <span className={styles.currency}>S/</span>
        <span className={styles.price}>197</span>
      </div>
      <button>
        <i className="linearicon-cross" />
      </button>
    </div>
  );
}

export default CartItem;
