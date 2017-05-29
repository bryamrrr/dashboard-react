import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Card(props) {
  return (
    <div className={styles.card}>
      {props.children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Card;
