import React from 'react';

import Card from '../../../../components/card';
import LoginForm from '../login-form';

import styles from './styles.css';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <Card>
          <div className={styles.bar} />
          <h1>Iniciar sesión</h1>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}

export default Login;
