import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';
import BackLogin from '../../../../components/back-login';

import regex from '../../../../regex';

import styles from './styles.css';

function renderEmail(field) {
  return (
    <FormInput
      field={field}
      name="email"
      type="email"
      placeholder="Correo electrónico"
      includeIcon="linearicon-envelope"
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

    const url = `${constants.urls.API_SECURITY}/send_password_email`;
    const data = { email: values.get('email') };
    const config = { successMessage: 'Las instrucciones han sido enviadas a su correo electrónico' };
    await httpRequest('POST', url, data, config);

    this.context.router.history.push('/login');
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={styles.form}
      >
        <Field
          name="email"
          component={renderEmail}
        />
        <FormButton
          callToAction="Enviar instrucciones"
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

  if (!values.get('email')) {
    errors.email = 'Ingresa tu correo electrónico';
  } else if (!regex.validate.email.test(values.get('email'))) {
    errors.email = regex.message.email;
  }

  return errors;
}

ResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

ResetForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

const ResetReduxForm = reduxForm({
  validate,
  form: 'UserReset',
})(ResetForm);

export default ResetReduxForm;
