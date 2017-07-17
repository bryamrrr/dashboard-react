import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Toaster(props) {
  return (
    <div className={`${styles.container} ${styles[props.type]} ${styles.show}`}>
      <div>
        {props.message}
      </div>
      <a className={styles.close}><i className="linearicon-cross" /></a>
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
