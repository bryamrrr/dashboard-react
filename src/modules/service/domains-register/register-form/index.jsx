
import React from 'react';

import Combo from '../../../../components/combo';
import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function RegisterForm() {
  const type = {
    1: {
      id: '1',
      name: 'A',
    },
    2: {
      id: '2',
      name: 'AAAA',
    },
    3: {
      id: '3',
      name: 'CNAME',
    },
    4: {
      id: '4',
      name: 'MX',
    },
    5: {
      id: '5',
      name: 'NS',
    },
    6: {
      id: '6',
      name: 'TXT',
    },
  };
  return (
    <div className={styles.container}>
      <FormInput
        name="nombre"
        placeholder="Nombre"
      />
      <div>.qiqmapunku.org</div>
      <Combo
        placeholder="Tipo"
        options={type}
        includeIcon="linearicon-users2"
      />
      <FormInput
        name="content"
        placeholder="Contenido"
      />
      <FormInput
        name="duration"
        placeholder="Duración"
      />
      <FormInput
        name="priority"
        placeholder="Prioridad"
        includeIcon="linearicon-users2"
      />
      <FormButton
        callToAction="Agregar"
      />
    </div>
  );
}

export default RegisterForm;
