import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpin from '../loading-spin';

import styles from './styles.css';

function FormButton(props) {
  const className = (props.loading)
    ? `${styles.button} ${styles.isLoading}`
    : styles.button;

  return (
    <button
      className={className}
      disabled={props.loading}
      type={props.type}
    >
      { (props.includeIcon !== '') &&
        <i className={`${styles.icon} ${props.includeIcon}`} />
      }
      <span>{props.callToAction}</span>
      { props.loading && <LoadingSpin size={19} /> }
    </button>
  );
}

FormButton.propTypes = {
  callToAction: PropTypes.string,
  type: PropTypes.string,
  includeIcon: PropTypes.string,
  loading: PropTypes.bool,
};

FormButton.defaultProps = {
  callToAction: 'Enviar',
  type: 'button',
  includeIcon: '',
  loading: false,
};

export default FormButton;
