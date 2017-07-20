
import React from 'react';

import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function DnsForm() {
  const type = {
    1: {
      id: '1',
      name: 'Predeterminado',
    },
    2: {
      id: '2',
      name: 'Subordinado',
    },
    3: {
      id: '3',
      name: 'Foráneo',
    },
  };
  return (
    <div className={styles.container}>
      <article>
        <Combo
          placeholder="Tipo de DNS"
          options={type}
          includeIcon="linearicon-gear"
        />
      </article>
      <article>
        <Combo
          placeholder="Nombre de DNS"
          options={type}
          includeIcon="linearicon-register"
        />
      </article>
      <FormButton
        callToAction="Agregar"
      />
    </div>
  );
}

export default DnsForm;
