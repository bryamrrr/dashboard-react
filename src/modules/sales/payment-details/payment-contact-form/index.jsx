import React from 'react';

import FormInput from '../../../../components/form-input';

import styles from './styles.css';

function PaymentContactForm() {
  return (
    <div className={styles.container}>
      <FormInput
        name="name"
        includeIcon="linearicon-user"
        placeholder="Razón social"
      />
      <FormInput
        name="ruc"
        includeIcon="linearicon-profile"
        placeholder="RUC"
      />
      <FormInput
        name="address"
        includeIcon="linearicon-map-marker"
        placeholder="Dirección"
      />
    </div>
  );
}

export default PaymentContactForm;
