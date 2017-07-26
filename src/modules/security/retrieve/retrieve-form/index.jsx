import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

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
  constructor(props, context) {
    super(props, context);

    this.state = { loading: false };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    this.setState({ loading: true });

    const url = `${constants.urls.API_SECURITY}/token_change_password`;
    const data = {
      password: values.get('password'),
      token: this.context.router.route.match.params.token,
    };

    await httpRequest('PUT', url, data);

    console.log('todo bien');
    this.context.router.history.push('/login');
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

  if (!values.get('password')) {
    errors.password = 'Ingresa una nueva contraseña';
  } else if (!regex.validate.password.test(values.get('password'))) {
    errors.password = regex.message.password;
  }

  if (!values.get('repeatPassword')) {
    errors.repeatPassword = 'Ingresa la nueva contraseña una vez más';
  } else if (values.get('repeatPassword') !== values.get('password')) {
    errors.repeatPassword = 'Las contraseñas no coinciden';
  }

  return errors;
}

ResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

ResetForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default reduxForm({
  validate,
  form: 'UserReset',
})(ResetForm);
