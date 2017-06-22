import React from 'react';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function UserDataForm() {
  const countries = {
    1: {
      id: 1,
      name: 'Perú',
    },
    2: {
      id: 2,
      name: 'Estados Unidos',
    },
    3: {
      id: 3,
      name: 'Argentina',
    },
  };

  const documentTypes = {
    1: {
      id: 1,
      name: 'DNI',
    },
    2: {
      id: 2,
      name: 'RUC',
    },
    3: {
      id: 3,
      name: 'OTROS',
    },
  };

  const customerTypes = {
    1: {
      id: 1,
      name: 'Persona',
    },
    2: {
      id: 2,
      name: 'Empresa',
    },
  };

  const businessareas = {
    1: {
      id: 1,
      name: 'Agricultura, ganadería, silvicultura y pesca',
    },
    2: {
      id: 2,
      name: 'Explotación de minas y canteras',
    },
    3: {
      id: 3,
      name: 'Industrias manufactureras',
    },
  };

  return (
    <div className={styles.container}>
      <article>
        <FormInput
          name="user"
          includeIcon="linearicon-user"
          placeholder="Usuario"
        />
      </article>
      <article>
        <FormInput
          name="email"
          includeIcon="linearicon-envelope"
          placeholder="Correo"
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
          name="phone"
          includeIcon="linearicon-phone"
          placeholder="Telefono"
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
          includeIcon="linearicon-users"
          placeholder="Selecciona un tipo de persona"
          options={customerTypes}
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-library"
          placeholder="Selecciona un Rubro"
          options={businessareas}
        />
      </article>
      <FormButton
        callToAction="Actualizar mis datos"
      />
    </div>
  );
}

export default UserDataForm;
