import React from 'react';

import Anchor from '../anchor';

import styles from './styles.css';

function BackLogin() {
  return (
    <div className={styles.link}>
      <i className="linearicon-arrow-left5" />
      <Anchor text="Login" />
    </div>
  );
}

export default BackLogin;
