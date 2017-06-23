import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

function ButtonIcon(props) {
  return (
    <div className={styles.button}>
      <Link to="/">
        <i className={props.icon} />
      </Link>
    </div>
  );
}

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default ButtonIcon;
