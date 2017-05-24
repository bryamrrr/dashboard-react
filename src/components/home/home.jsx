import React from 'react';
import styles from './home.css';

import TextInput from '../text-input';

function Home() {
  return (
    <div>
      <h1 className={styles.title}>Bienvenido :) hola mundo</h1>
      <TextInput placeholder="Ingresa tu usuario" />
    </div>
  );
}

export default Home;
