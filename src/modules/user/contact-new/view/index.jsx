import React from 'react';

import UserNewContactForm from '../user-new-contact-form';

import Hexagon from '../../../../components/hexagon';

import styles from './styles.css';

function UserContactNew() {
  return (
    <div>
      <div className={styles.title}>
        <Hexagon color="orange">
          <i className="linearicon-user" />
        </Hexagon>
        <h2>Nuevo contacto</h2>
      </div>
      <UserNewContactForm />
    </div>
  );
}

export default UserContactNew;
