import React from 'react';
import styles from './home.css';

import FormInput from '../form-input';
import FormButton from '../form-button';

function Home() {
  return (
    <div>
      <h1 className={styles.title}>:)</h1>
      <FormInput
        name="user"
        placeholder="Usuario"
        includeIcon="linearicon-user"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="Contraseña"
        includeIcon="linearicon-lock"
      />
      <FormButton />
    </div>
  );
}

export default Home;
