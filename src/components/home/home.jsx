import React from 'react';
import styles from './home.css';

import TextInput from '../text-input';

function Home() {
  return (
    <div>
      <h1 className={styles.title}>:)</h1>
      <TextInput
        name="user"
        placeholder="Ingresa tu usuario"
        includeIcon="linearicon-user"
      />
    </div>
  );
}

export default Home;
