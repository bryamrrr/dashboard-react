import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MenuItem from '../menu-item';
import routes from '../../extra/routes';

import styles from './styles.css';

function MenuAside(props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src={`${props.context}/images/logo.png`}
          alt=""
        />
      </header>
      <div className={styles.items}>
        {routes
          .map(menu => (
            <MenuItem
              key={menu.title}
              title={menu.title}
              icon={menu.icon}
              items={menu.items}
            />
          ))
        }
      </div>
    </div>
  );
}

function mapStateToProps({ context }) {
  return {
    context,
  };
}

MenuAside.propTypes = {
  context: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MenuAside);
