import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Toaster from '../../../components/toaster';
import MenuAside from '../../../components/menu-aside';
import Header from '../../../components/header';
import Cart from '../cart';

import styles from './styles.css';

function Dashboard(props) {
  return (
    <div>
      {props.items.valueSeq().map(item =>
        <Toaster key={item.id} type={item.type} message={item.message} />,
      )}
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
  items: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

function mapStateToProps(state) {
  return { items: state.get('toaster') };
}

export default connect(mapStateToProps)(Dashboard);
