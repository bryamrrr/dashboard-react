import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Anchor(props) {
  return <span className={styles.link}>{props.text}</span>;
}

Anchor.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Anchor;
