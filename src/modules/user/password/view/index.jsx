import React from 'react';

import UserPasswordForm from '../user-password-form';
import CoverPhoto from '../../coverphoto';

import styles from './styles.css';

function UserPassword() {
  return (
    <div className={styles.container}>
      <CoverPhoto title="Cambiar contraseña" />
      <div className={styles.form}>
        <UserPasswordForm />
      </div>
    </div>
  );
}

export default UserPassword;
