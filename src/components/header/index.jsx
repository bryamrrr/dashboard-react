import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BreadCrumb from '../../components/bread-crumb';
import Settings from '../../modules/dashboard/settings';
import CartResume from '../../modules/dashboard/cart-resume';

import styles from './styles.css';

function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/inicio">
          <img
            src={`${props.context}/images/logo.png`}
            alt="Logo Yachay"
          />
        </Link>
      </div>
      <i className={`${styles.icon} linearicon-options`} />
      <BreadCrumb />
      <Settings />
      <CartResume />
    </header>
  );
}

Header.propTypes = {
  context: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return { context: state.get('context') };
}

export default connect(mapStateToProps)(Header);
