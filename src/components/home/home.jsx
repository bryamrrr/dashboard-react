import React from 'react';
import styles from './home.css';

import TextInput from '../text-input';

function Home() {
  return (
    <div>
      <h1 className={styles.title}>:)</h1>
      <TextInput
        name="user"
        placeholder="Usuario"
        includeIcon="linearicon-user"
      />
      <TextInput
        name="password"
        placeholder="Contraseña"
        includeIcon="linearicon-lock"
      />
    </div>
  );
}

export default Home;
