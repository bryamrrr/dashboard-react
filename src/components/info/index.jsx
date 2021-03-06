import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styles from './styles.css';

function Info(props) {
  let icon = 'info';
  let containerClases = styles.container;

  if (props.type === 'warning') {
    icon = 'linearicon-circle-exclamation';
    containerClases += ` ${styles.warning}`;
  } else if (props.type === 'success') {
    icon = 'linearicon-checkmark';
    containerClases += ` ${styles.success}`;
  }

  return (
    <div className={containerClases}>
      <i className={icon} />
      <p className={styles.text}>{props.text}</p>
      {(props.addToCart &&
        <span
          className={styles.link}
          onClick={() => props.addToCart()}
          aria-hidden
        >
          {props.strings.others.addToCart}
        </span>
      )}
    </div>
  );
}

Info.propTypes = {
  addToCart: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

Info.defaultProps = {
  addToCart: null,
  type: 'info',
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(Info);
