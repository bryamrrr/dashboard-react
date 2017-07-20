
import React from 'react';

import Combo from '../../../../components/combo';
import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';
import ButtonIcon from '../../../../components/button-icon';
import Anchor from '../../../../components/anchor';

import styles from './styles.css';

function DnsSubordinateForm() {
  const domains = {
    1: {
      id: '1',
      name: '.qiqmapunku.org',
    },
    2: {
      id: '2',
      name: '.qiqmapunku.pe',
    },
    3: {
      id: '3',
      name: '.qiqmapunku.com',
    },
  };
  return (
    <div className={styles.container}>
      <article className={styles.searchDomain}>
        <FormInput
          name="nombre"
          placeholder="Nombre"
        />
        <Combo
          placeholder="Dominio"
          options={domains}
        />
      </article>
      <h3>IPs v4 (Máximo 5)</h3>
      <div className={styles.inputContainer}>
        <FormInput
          name="ipv4"
          placeholder="IP v4"
        />
        <ButtonIcon
          icon="linearicon-trash2"
          tooltip="Eliminar"
        />
      </div>
      <Anchor text="Agregar IP v4" />
      <h3>IPs v6 (Máximo 5)</h3>
      <div className={styles.inputContainer}>
        <FormInput
          name="ipv6"
          placeholder="IP v6"
        />
        <ButtonIcon
          icon="linearicon-trash2"
          tooltip="Eliminar"
        />
      </div>
      <Anchor text="Agregar IP v6" />
      <FormButton
        callToAction="Crear dns subordinado"
      />
    </div>
  );
}

export default DnsSubordinateForm;
