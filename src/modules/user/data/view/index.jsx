import React from 'react';

import UserDataForm from '../user-data-form';
import CoverPhoto from '../../coverphoto';

import styles from './styles.css';

function UserData() {
  return (
    <div>
      <CoverPhoto title="Actualizar mis datos" />
      <div className={styles.form}>
        <UserDataForm />
      </div>
    </div>
  );
}

export default UserData;
