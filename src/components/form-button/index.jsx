import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpin from '../loading-spin';

import styles from './styles.css';

function FormButton(props) {
  const className = (props.loading || props.disabled)
    ? `${styles.button} ${styles.isLoading}`
    : styles.button;

  if (props.onClick === null) {
    return (
      <button
        className={className}
        disabled={props.loading || props.disabled}
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

  return (
    <button
      className={className}
      disabled={props.loading || props.disabled}
      type={props.type}
      onClick={() => props.onClick()}
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
  onClick: PropTypes.func,
  callToAction: PropTypes.string,
  type: PropTypes.string,
  includeIcon: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

FormButton.defaultProps = {
  onClick: null,
  callToAction: 'Enviar',
  type: 'button',
  includeIcon: '',
  loading: false,
  disabled: false,
};

export default FormButton;
