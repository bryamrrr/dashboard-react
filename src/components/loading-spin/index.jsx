import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function LoadingSpin(props) {
  const spinStyles = {
    height: props.size,
    width: props.size,
  };

  return (
    <div className={styles.circle} style={spinStyles}>
      <div className={`${styles.circle1} ${styles.child}`} />
      <div className={`${styles.circle2} ${styles.child}`} />
      <div className={`${styles.circle3} ${styles.child}`} />
      <div className={`${styles.circle4} ${styles.child}`} />
      <div className={`${styles.circle5} ${styles.child}`} />
      <div className={`${styles.circle6} ${styles.child}`} />
      <div className={`${styles.circle7} ${styles.child}`} />
      <div className={`${styles.circle8} ${styles.child}`} />
      <div className={`${styles.circle9} ${styles.child}`} />
      <div className={`${styles.circle10} ${styles.child}`} />
      <div className={`${styles.circle11} ${styles.child}`} />
      <div className={`${styles.circle12} ${styles.child}`} />
    </div>
  );
}

LoadingSpin.propTypes = {
  size: PropTypes.string,
};

LoadingSpin.defaultProps = {
  size: 40,
};

export default LoadingSpin;
