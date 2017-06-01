import React from 'react';

import CatalogCard from '../../catalog-card';

import styles from './styles.css';

function Hosting() {
  return (
    <div className={styles.container}>
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
    </div>
  );
}

export default Hosting;
