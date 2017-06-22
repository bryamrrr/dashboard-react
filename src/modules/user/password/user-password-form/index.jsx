import React from 'react';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function UserPasswordForm() {
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
          name="password"
          includeIcon="linearicon-key"
          placeholder="Contraseña actual"
        />
      </article>
      <article>
        <FormInput
          name="newPassword"
          includeIcon="linearicon-key"
          placeholder="Nueva contraseña"
        />
      </article>
      <article>
        <FormInput
          name="repeatNewPassword"
          includeIcon="linearicon-key"
          placeholder="Repetir nueva contraseña"
        />
      </article>
      <FormButton
        callToAction="Cambiar contraseña"
      />
    </div>
  );
}

export default UserPasswordForm;
