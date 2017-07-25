import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form/immutable';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import { showToaster } from '../../../../reducers/toaster/actions';

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
  constructor(props, context) {
    super(props, context);

    this.state = { loading: false };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    this.setState({ loading: true });

    const url = `${constants.urls.API_SECURITY}/users`;
    const data = {
      username: values.get('username'),
      email: values.get('email'),
      password: values.get('password'),
    };

    await httpRequest('POST', url, data);

    this.props.showToaster('success', 'Usuario creado exitosamente');
    this.context.router.history.push('/login');
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

  if (!values.get('username')) errors.username = 'Ingresa un nombre de usuario';

  if (!values.get('email')) {
    errors.email = 'Ingresa tu correo';
  } else if (!regex.validate.email.test(values.get('email'))) {
    errors.email = regex.message.email;
  }

  if (!values.get('password')) {
    errors.password = 'Ingresa una contraseña';
  } else if (!regex.validate.password.test(values.get('password'))) {
    errors.password = regex.message.password;
  }

  if (!values.get('repeatPassword')) {
    errors.repeatPassword = 'Ingresa una contraseña';
  } else if (values.get('repeatPassword') !== values.get('password')) {
    errors.repeatPassword = 'Las contraseñas no coinciden';
  }

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  showToaster: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

const SignupReduxForm = reduxForm({
  validate,
  form: 'UserSignup',
})(SignupForm);

export default connect(null, { showToaster })(SignupReduxForm);
