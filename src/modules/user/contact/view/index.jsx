import React from 'react';

import UserContactTable from '../user-contact-table';

import styles from './styles.css';

function UserContact() {
  return (
    <div>
      <div className={styles.form}>
        <UserContactTable />
      </div>
    </div>
  );
}

export default UserContact;
