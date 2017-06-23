import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

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

  if (!values.email) {
    errors.email = 'Ingresa tu correo electrónico';
  } else if (!regex.validate.email.test(values.email)) {
    errors.email = regex.message.email;
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
