import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

class UserPasswordForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loading: false };

    this.renderField = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.initialize({
      username: this.props.user.username,
    });
  }

  async onSubmit(values) {
    this.setState({ loading: true });

    const data = {
      password: values.get('currentPassword'),
      newpassword: values.get('newPassword'),
    };

    const url = `${constants.urls.API_SECURITY}/change_password/${this.props.user.id}`;
    const config = { successMessage: 'La constraseña ha sido actualizada' };
    const response = await httpRequest('PUT', url, data, config);

    this.setState({ loading: false });

    if (response.meta.ok) {
      const urlRedirect = '/inicio';
      this.context.router.history.push(urlRedirect);
    }
  }

  renderField(field) {
    const { name } = field.input;

    let icon = '';
    let disabled = false;
    let type = 'text';
    switch (name) {
      case 'username':
        icon = 'linearicon-user';
        disabled = true;
        break;
      case 'currentPassword':
        icon = 'linearicon-key';
        type = 'password';
        break;
      case 'newPassword':
        icon = 'linearicon-key';
        type = 'password';
        break;
      case 'repeatNewPassword':
        icon = 'linearicon-key';
        type = 'password';
        break;
      default:
        icon = 'linearicon-edit';
        type = 'text';
    }

    return (
      <FormInput
        field={field}
        name={name}
        includeIcon={icon}
        placeholder={this.props.strings.forms[name]}
        disabled={disabled}
        type={type}
      />
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.container}>
        <article>
          <Field
            name="username"
            component={this.renderField}
            value={this.props.user.username}
          />
        </article>
        <article>
          <Field
            name="currentPassword"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="newPassword"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="repeatNewPassword"
            component={this.renderField}
          />
        </article>
        <FormButton
          callToAction={this.props.strings.changePassword.title}
          loading={this.state.loading}
          type="submit"
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.get('currentPassword')) errors.currentPassword = 'Ingresa tu contraseña actual';
  if (!values.get('newPassword')) errors.newPassword = 'Ingresa una nueva contraseña';
  if (!values.get('repeatNewPassword')) {
    errors.repeatNewPassword = 'Repite tu nueva contraseña';
  } else if (values.get('newPassword') !== values.get('repeatNewPassword')) {
    errors.repeatNewPassword = 'Las contraseñas no coinciden';
  }

  return errors;
}

UserPasswordForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

UserPasswordForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    strings: state.get('translate').strings,
    user: state.get('auth').user,
  };
}

const UserPasswordReduxForm = reduxForm({
  form: 'UserDataForm',
  validate,
})(UserPasswordForm);

export default connect(mapStateToProps)(UserPasswordReduxForm);
