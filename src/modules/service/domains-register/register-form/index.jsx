
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
      <article className={styles.name}>
        <FormInput
          name="nombre"
          placeholder="Nombre"
        />
        <div>.qiqmapunku.org</div>
      </article>
      <article>
        <Combo
          placeholder="Tipo"
          options={type}
          includeIcon="linearicon-gear"
        />
      </article>
      <article>
        <FormInput
          name="content"
          placeholder="Contenido"
          includeIcon="linearicon-register"
        />
      </article>
      <article className={styles.duration}>
        <FormInput
          name="duration"
          placeholder="Duración"
          includeIcon="linearicon-clock"
        />
        <FormInput
          name="priority"
          placeholder="Prioridad"
          includeIcon="linearicon-circle-exclamation"
        />
      </article>
      <FormButton
        callToAction="Agregar"
      />
    </div>
  );
}

export default RegisterForm;
