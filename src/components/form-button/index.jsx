import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function FormButton(props) {
  return (
    <button className={styles.button}>
      { (props.includeIcon !== '') &&
        <i className={`${styles.icon} ${props.includeIcon}`} />
      }
      <span>{props.callToAction}</span>
    </button>
  );
}

FormButton.propTypes = {
  callToAction: PropTypes.string,
  includeIcon: PropTypes.string,
};

FormButton.defaultProps = {
  callToAction: 'Enviar',
  includeIcon: '',
};

export default FormButton;
