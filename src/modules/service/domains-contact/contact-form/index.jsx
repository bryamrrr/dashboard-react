import React from 'react';

import { Link } from 'react-router-dom';

import Anchor from '../../../../components/anchor';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function ContactForm() {
  const contacts = {
    1: {
      id: '1',
      name: 'Team qiqmapunku',
    },
    2: {
      id: '2',
      name: 'Administrador',
    },
  };
  return (
    <div className={styles.container}>
      <article className={styles.itemContact}>
        <h3>Contacto registrante</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder="Selecciona un contacto"
            options={contacts}
          />
          <Link to="#">
            <Anchor text="o crea un nuevo contacto" />
          </Link>
        </div>
      </article>
      <article className={styles.itemContact}>
        <h3>Contacto administrativo</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder="Selecciona un contacto"
            options={contacts}
          />
          <Link to="#">
            <Anchor text="o crea un nuevo contacto" />
          </Link>
        </div>
      </article>
      <article className={styles.itemContact}>
        <h3>Contacto técnico</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder="Selecciona un contacto"
            options={contacts}
          />
          <Link to="#">
            <Anchor text="o crea un nuevo contacto" />
          </Link>
        </div>
      </article>
      <article className={styles.itemContact}>
        <h3>Contacto de facturación</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder="Selecciona un contacto"
            options={contacts}
          />
          <Link to="#">
            <Anchor text="o crea un nuevo contacto" />
          </Link>
        </div>
      </article>
      <FormButton
        callToAction="Guardar"
      />
    </div>
  );
}

export default ContactForm;
