import React from 'react';

import Combo from '../../../../components/combo';
import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function ActivateForm() {
  const domains = {
    1: {
      id: '1',
      name: 'qiqmapunku.com',
    },
    2: {
      id: '2',
      name: 'qiqmapunku.pe',
    },
    3: {
      id: '3',
      name: 'qiqmapunku.org',
    },
  };
  return (
    <div className={styles.container}>
      <Combo
        includeIcon="linearicon-earth"
        placeholder="Selecciona un dominio"
        options={domains}
      />
      <FormInput
        name="user"
        includeIcon="linearicon-user"
        placeholder="Usuario cPanel"
      />
      <FormInput
        name="password"
        includeIcon="linearicon-key"
        placeholder="Contraseña"
        type="password"
      />
      <FormInput
        name="repeatPassword"
        includeIcon="linearicon-key"
        placeholder="Repetir contraseña"
        type="password"
      />
      <FormButton
        callToAction="Activar"
      />
    </div>
  );
}

export default ActivateForm;
