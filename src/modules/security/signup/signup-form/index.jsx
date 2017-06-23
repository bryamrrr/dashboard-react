import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import regex from '../../../../regex';

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

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log(values);

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
          loading={this.state.loading}
          type="submit"
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) errors.username = 'Ingresa un nombre de usuario';

  if (!values.email) {
    errors.email = 'Ingresa tu correo';
  } else if (!regex.validate.email.test(values.email)) {
    errors.email = regex.message.email;
  }

  if (!values.password) {
    errors.password = 'Ingresa una contraseña';
  } else if (!regex.validate.password.test(values.password)) {
    errors.password = regex.message.password;
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Ingresa una contraseña';
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = 'Las contraseñas no coinciden';
  }

  console.log(errors);

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'UserSignup',
})(SignupForm);
