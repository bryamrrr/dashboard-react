import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Card(props) {
  const className = (props.includeBorder)
    ? `${styles.card} ${styles.withBorder}`
    : styles.card;

  const externalStyles = { borderTopColor: props.color };

  return (
    <div
      className={className}
      style={externalStyles}
    >
      {props.children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
  color: PropTypes.string,
  includeBorder: PropTypes.bool,
};

Card.defaultProps = {
  color: '',
  includeBorder: false,
};

export default Card;
