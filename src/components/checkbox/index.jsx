import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function CheckBox(props) {
  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="none"
          id="checkbox"
          name="checkbox"
        />
        <label
          htmlFor="checkbox"
          className={styles.check}
        />
      </div>
      <label
        htmlFor="checkbox"
        className={styles.noSelect}
      >
        {props.children}
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
};

export default CheckBox;
