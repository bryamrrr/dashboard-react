import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Hexagon(props) {
  return (
    <div className={`${styles.hexagon} ${styles[props.color]}`}>
      <svg width="100%" height="100%" viewBox="202 145 74 85">
        <polygon id="Path-1" stroke="#ccc" strokeWidth="1.2" fill="none" points="203 207.883442 237.874709 228.135956 274.226063 207.883442 274.226063 167.80381 237.87471 147 203 167.80381" />
      </svg>
      {props.children}
    </div>
  );
}

Hexagon.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Hexagon;
