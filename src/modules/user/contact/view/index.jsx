import React from 'react';

import UserContactTable from '../user-contact-table';

import Hexagon from '../../../../components/hexagon';
import FormSearch from '../../../../components/form-search';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function UserContact() {
  return (
    <div>
      <div className={styles.title}>
        <Hexagon color="orange">
          <i className="linearicon-users2" />
        </Hexagon>
        <h2>Mis contactos</h2>
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <FormSearch />
        </div>
        <div className={styles.buttonContainer}>
          <FormButton
            callToAction="Nuevo contacto"
            includeIcon="linearicon-user"
          />
        </div>
      </div>
      <UserContactTable />
    </div>
  );
}

export default UserContact;
