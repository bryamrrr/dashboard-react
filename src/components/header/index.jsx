import React from 'react';

import BreadCrumb from '../../components/bread-crumb';
import Settings from '../../modules/dashboard/settings';
import CartResume from '../../modules/dashboard/cart-resume';

import styles from './styles.css';

function Header() {
  return (
    <header className={styles.header}>
      <i className={`${styles.icon} linearicon-list`} />
      <BreadCrumb />
      <Settings />
      <CartResume />
    </header>
  );
}

export default Header;
