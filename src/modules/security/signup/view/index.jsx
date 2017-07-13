import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../../components/card';
import BackLogin from '../../../../components/back-login';
import SignupForm from '../signup-form';

import styles from './styles.css';

function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <Card>
          <div className={styles.bar} />
          <div className={styles.linkTop}>
            <Link to="/login">
              <BackLogin />
            </Link>
          </div>
          <h1>Registro</h1>
          <SignupForm />
          <div className={styles.linkBottom}>
            <Link to="/login">
              <BackLogin />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
