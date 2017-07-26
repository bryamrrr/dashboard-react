import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Toaster(props) {
  return (
    <div className={`${styles.container} ${styles[props.type]} ${styles.show}`}>
      {props.message}
    </div>
  );
}


Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Toaster.defaultProps = {
  type: 'sucess',
};

export default Toaster;
