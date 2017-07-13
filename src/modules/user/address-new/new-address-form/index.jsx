import React from 'react';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function NewAddressForm() {
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

  const types = {
    1: {
      id: '1',
      name: 'Fiscal',
    },
    2: {
      id: '2',
      name: 'Envío',
    },
  };

  return (
    <div className={styles.container}>
      <article>
        <Combo
          includeIcon="linearicon-earth"
          placeholder="Selecciona un país"
          options={countries}
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
        <FormInput
          name="ubigeo"
          includeIcon="linearicon-location"
          placeholder="Ubigeo"
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
          includeIcon="linearicon-register"
          placeholder="Selecciona un tipo"
          options={types}
        />
      </article>
      <FormButton
        callToAction="Crear dirección"
      />
    </div>
  );
}

export default NewAddressForm;
