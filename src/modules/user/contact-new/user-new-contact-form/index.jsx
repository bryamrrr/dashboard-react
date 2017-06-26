import React from 'react';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function UserNewContactForm() {
  const countries = {
    1: {
      id: '1',
      name: 'Perú',
    },
    2: {
      id: '2',
      name: 'Estados Unidos',
    },
    3: {
      id: '3',
      name: 'Argentina',
    },
  };

  const documentTypes = {
    1: {
      id: '1',
      name: 'DNI',
    },
    2: {
      id: '2',
      name: 'RUC',
    },
    3: {
      id: '3',
      name: 'OTROS',
    },
  };

  const customerTypes = {
    1: {
      id: '1',
      name: 'Persona',
    },
    2: {
      id: '2',
      name: 'Empresa',
    },
  };

  const notificationTypes = {
    1: {
      id: '1',
      name: 'Administración',
    },
    2: {
      id: '2',
      name: 'Cobranza',
    },
  };

  return (
    <div className={styles.container}>
      <article>
        <FormInput
          name="name"
          includeIcon="linearicon-user"
          placeholder="Nombres"
        />
      </article>
      <article>
        <FormInput
          name="lastname"
          includeIcon="linearicon-user"
          placeholder="Apellidos"
        />
      </article>
      <article>
        <FormInput
          name="email"
          includeIcon="linearicon-envelope"
          placeholder="Correo electrónico"
        />
      </article>
      <article>
        <FormInput
          name="phone"
          includeIcon="linearicon-phone"
          placeholder="Teléfono"
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-register"
          placeholder="Selecciona un tipo de documento"
          options={documentTypes}
        />
      </article>
      <article>
        <FormInput
          name="document"
          includeIcon="linearicon-profile"
          placeholder="Número de documento"
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-earth"
          placeholder="Selecciona un país"
          options={countries}
        />
      </article>
      <article>
        <FormInput
          name="ubigeo"
          includeIcon="linearicon-location"
          placeholder="Ubigeo"
        />
      </article>
      <article>
        <FormInput
          name="address"
          includeIcon="linearicon-map-marker"
          placeholder="Dirección"
        />
      </article>
      <article>
        <FormInput
          name="reference"
          includeIcon="linearicon-road-sign"
          placeholder="Referencia"
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-users"
          placeholder="Selecciona un tipo de persona"
          options={customerTypes}
        />
      </article>
      <article>
        <FormInput
          name="postalcode"
          includeIcon="linearicon-map-marker"
          placeholder="Codigo Postal"
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-comments"
          placeholder="Selecciona un tipo de notificación"
          options={notificationTypes}
        />
      </article>
      <FormButton
        callToAction="Crear contacto"
      />
    </div>
  );
}

export default UserNewContactForm;
