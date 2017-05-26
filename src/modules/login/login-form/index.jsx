import React from 'react';

import { Field, reduxForm } from 'redux-form';

import FormInput from '../../../components/form-input';
import FormButton from '../../../components/form-button';

function LoginForm() {
  return (
    <form>
      <Field
        name="username"
        component={field =>
          <FormInput
            field={field}
            name="username"
            placeholder="Usuario"
            includeIcon="linearicon-user"
          />
        }
      />

      <Field
        name="password"
        component={field =>
          <FormInput
            field={field}
            name="password"
            type="password"
            placeholder="Contraseña"
            includeIcon="linearicon-lock"
          />
        }
      />

      <FormButton
        callToAction="Iniciar sesión"
        type="submit"
      />
    </form>
  );
}

export default reduxForm({
  form: 'UserLogin',
})(LoginForm);
