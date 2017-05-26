import React from 'react';

import { Field, reduxForm } from 'redux-form';

import FormInput from '../../../components/form-input';
import FormButton from '../../../components/form-button';

function renderUsername(field) {
  return (
    <FormInput
      field={field}
      name="username"
      placeholder="Usuario"
      includeIcon="linearicon-user"
    />
  );
}

function renderEmail(field) {
  return (
    <FormInput
      field={field}
      name="email"
      placeholder="Correo electrónico"
      includeIcon="linearicon-envelope"
    />
  );
}

function renderPassword(field) {
  return (
    <FormInput
      field={field}
      name="password"
      type="password"
      placeholder="Contraseña"
      includeIcon="linearicon-lock"
    />
  );
}

function renderRepeatPassword(field) {
  return (
    <FormInput
      field={field}
      name="verifyPassword"
      type="password"
      placeholder="Repetir contraseña"
      includeIcon="linearicon-lock"
    />
  );
}

function SignupForm() {
  return (
    <form>
      <Field
        name="username"
        component={renderUsername}
      />
      <Field
        name="email"
        component={renderEmail}
      />
      <Field
        name="password"
        component={renderPassword}
      />
      <Field
        name="repeatPassword"
        component={renderRepeatPassword}
      />
      <FormButton
        callToAction="Registrar"
        type="submit"
      />
    </form>
  );
}

export default reduxForm({
  form: 'UserSignup',
})(SignupForm);
