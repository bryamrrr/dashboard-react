import React from 'react';

import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function CartItem() {
  return (
    <div className={styles.container}>
      <Hexagon color="red">
        <i className="linearicon-drawer2" />
      </Hexagon>
    </div>
  );
}

export default CartItem;
