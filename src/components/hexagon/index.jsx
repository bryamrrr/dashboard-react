import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Hexagon(props) {
  return (
    <div className={`${styles.hexagon} ${styles[props.color]}`}>
      {props.children}
    </div>
  );
}

Hexagon.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Hexagon;
