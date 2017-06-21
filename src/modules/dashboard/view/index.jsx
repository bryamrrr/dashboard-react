import React from 'react';
import PropTypes from 'prop-types';

import MenuAside from '../../../components/menu-aside';
import Header from '../../../components/header';
import Cart from '../cart';

import styles from './styles.css';

function Dashboard(props) {
  return (
    <div>
      <MenuAside />
      <Header />
      <Cart />
      <div className={styles.container}>
        <div className={styles.card}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Dashboard;
