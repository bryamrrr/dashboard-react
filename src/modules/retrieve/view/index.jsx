import React from 'react';

import RetrieveForm from '../retrieve-form';
import Card from '../../../components/card';

import styles from './styles.css';

function Retrieve() {
  return (
    <div className={styles.container}>
      <div className={styles.retrieveContainer}>
        <Card>
          <div className={styles.bar} />
          <h1>Restablecer contraseña</h1>
          <RetrieveForm />
        </Card>
      </div>
    </div>
  );
}

export default Retrieve;
