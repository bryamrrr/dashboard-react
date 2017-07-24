import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function CheckBox(props) {
  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={props.checked}
          id="checkbox"
          name="checkbox"
          onChange={() => props.changeValue(!props.checked)}
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
  changeValue: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

CheckBox.defaultProps = {
  checked: false,
};

export default CheckBox;
