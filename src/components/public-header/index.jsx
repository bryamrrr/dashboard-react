import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styles from './styles.css';

function PublicHeader(props) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="https://yachay.pe/">
          <img
            className={styles.logo}
            src={`${props.context}/images/logo.png`}
            alt=""
          />
        </a>
        <div className={styles.info}>
          <i className={`linearicon-phone ${styles.icon}`} />
          <span className={styles.light}>Soporte técnico</span>
          <span className={styles.dark}>+511 702-2000</span>
          <a href="https://yachay.pe/contacto">
            <button>Contacto especializado</button>
          </a>
        </div>
      </div>
    </header>
  );
}

function mapStateToProps({ context }) {
  return { context };
}

PublicHeader.propTypes = {
  context: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PublicHeader);
