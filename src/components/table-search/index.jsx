import React from 'react';

import styles from './styles.css';

function TableSearch() {
  return (
    <form name="form" className={styles.container}>
      <input type="text" className={styles.input} placeholder="Buscar" />
      <button type="submit" className={styles.searchButton}>
        <i className="linearicon-magnifier" />
      </button>
    </form>
  );
}


export default TableSearch;
