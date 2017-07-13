import React from 'react';

import styles from './styles.css';

function TablePagination() {
  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        <li className={`${styles.first} ${styles.disabled}`}>
          <a>...</a>
        </li>
        <li className={`${styles.prev} ${styles.disabled}`}>
          <a>
            <i className="linearicon-uni3c" />
          </a>
        </li>
        <li className={styles.active}>
          <a>1</a>
        </li>
        <li>
          <a>2</a>
        </li>
        <li>
          <a>3</a>
        </li>
        <li>
          <a>4</a>
        </li>
        <li>
          <a>5</a>
        </li>
        <li className={styles.next}>
          <a><i className="linearicon-uni3e" /></a>
        </li>
        <li className={styles.last}>
          <a>...</a>
        </li>
      </ul>
    </div>
  );
}


export default TablePagination;
