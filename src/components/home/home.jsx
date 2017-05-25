import React from 'react';

import FormInput from '../form-input';
import FormButton from '../form-button';

function Home() {
  return (
    <div>
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
      <FormButton
        callToAction="Iniciar sesión"
        includeIcon="linearicon-cart"
      />
    </div>
  );
}

export default Home;
