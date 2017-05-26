import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';

import FormInput from '../../../components/form-input';
import FormButton from '../../../components/form-button';
import Anchor from '../../../components/anchor';

import styles from './styles.css';

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

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log('values', values);
    console.log(this);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={styles.form}
      >
        <Field
          name="username"
          component={renderUsername}
        />
        <Field
          name="password"
          component={renderPassword}
        />
        <Link to="/reset">
          <Anchor text="¿Olvidaste tu contraseña?" />
        </Link>
        <FormButton
          callToAction="Iniciar sesión"
          type="submit"
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) errors.username = 'Ingresa tu usuario';

  if (!values.password) errors.password = 'Ingresa tu contraseña';

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'UserLogin',
})(LoginForm);
