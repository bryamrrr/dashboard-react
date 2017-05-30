import React from 'react';

import BreadCrumb from '../../components/bread-crumb';

import styles from './styles.css';

function Header() {
  return (
    <header className={styles.header}>
      <i className={`${styles.icon} linearicon-list`} />
      <BreadCrumb />
    </header>
  );
}

export default Header;
