import React from 'react';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';

import styles from './styles.css';

function HostingCatalog() {
  return (
    <div className={styles.container}>
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
    </div>
  );
}

function mapStateToProps({ catalog: { hosting } }) {
  return { hosting };
}

export default connect(mapStateToProps)(HostingCatalog);
