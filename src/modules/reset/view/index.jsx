import React from 'react';

import ResetForm from '../reset-form';
import Card from '../../../components/card';

import styles from './styles.css';

function Reset() {
  return (
    <div className={styles.container}>
      <div className={styles.resetContainer}>
        <Card>
          <div className={styles.bar} />
          <h1>Recuperar contraseña</h1>
          <ResetForm />
        </Card>
      </div>
    </div>
  );
}

export default Reset;
