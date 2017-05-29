import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../components/card';
import Anchor from '../../../components/anchor';
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
              <i className="linearicon-arrow-left" />
              <Anchor
                text="Login"
              />
            </Link>
          </div>
          <h1>Registro</h1>
          <SignupForm />
          <div className={styles.linkBottom}>
            <Link to="/login">
              <i className="linearicon-arrow-left" />
              <Anchor
                text="Login"
              />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
