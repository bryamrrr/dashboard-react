import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

function Table(props) {
  return (
    <table className={styles.table}>
      {props.children}
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
};

export default Table;
