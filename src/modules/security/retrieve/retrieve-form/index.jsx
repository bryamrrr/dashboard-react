import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';
import BackLogin from '../../../../components/back-login';

import regex from '../../../../regex';

import styles from './styles.css';

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
      name="repeatPassword"
      type="password"
      placeholder="Repetir contraseña"
      includeIcon="linearicon-lock"
    />
  );
}

class ResetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log('values', values);

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={styles.form}
      >
        <Field
          name="password"
          component={renderPassword}
        />
        <Field
          name="repeatPassword"
          component={renderRepeatPassword}
        />
        <FormButton
          callToAction="Enviar"
          loading={this.state.loading}
          type="submit"
        />
        <Link to="/login">
          <BackLogin />
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = 'Ingresa una nueva contraseña';
  } else if (!regex.validate.password.test(values.password)) {
    errors.password = regex.message.password;
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Ingresa la nueva contraseña una vez más';
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = 'Las contraseñas no coinciden';
  }

  return errors;
}

ResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'UserReset',
})(ResetForm);
