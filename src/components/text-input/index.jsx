import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function TextInput(props) {
  const externalStyles = {
    background: props.lineColor,
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
      />
      <div
        className={styles.bar}
        style={externalStyles}
      />
    </div>
  );
}

TextInput.propTypes = {
  lineColor: PropTypes.string,
};

TextInput.defaultProps = {
  lineColor: '#2391e6',
};

export default TextInput;
