import React from 'react';

import Card from '../../../components/card';
import SignupForm from '../signup-form';

import styles from './styles.css';

function Signup() {
  return (
    <div className={styles.container}>
      <Card>
        <SignupForm />
      </Card>
    </div>
  );
}

export default Signup;
