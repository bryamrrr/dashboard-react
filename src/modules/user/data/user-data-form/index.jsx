import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import { setLanguage } from '../../../../reducers/translate/actions';

import regex from '../../../../regex';

import styles from './styles.css';

class UserDataForm extends Component {
  constructor(props) {
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);
    this.renderUserField = this.renderUserField.bind(this);
    this.renderEmailField = this.renderEmailField.bind(this);
    this.renderNameField = this.renderNameField.bind(this);
    this.renderDocumentField = this.renderDocumentField.bind(this);
    this.renderPhoneField = this.renderPhoneField.bind(this);
  }

  onSubmit(values) {
    console.log(this);
    console.log(values);
  }

  changeLanguage(data) {
    const language = (data.id === 1) ? 'es' : 'en';
    this.props.setLanguage(language);
  }

  renderUserField(field) {
    return (
      <FormInput
        field={field}
        name="user"
        includeIcon="linearicon-user"
        placeholder={this.props.strings.forms.user}
      />
    );
  }

  renderEmailField(field) {
    return (
      <FormInput
        field={field}
        name="email"
        includeIcon="linearicon-envelope"
        placeholder={this.props.strings.forms.email}
      />
    );
  }

  renderNameField(field) {
    return (
      <FormInput
        field={field}
        name="name"
        includeIcon="linearicon-edit"
        placeholder={this.props.strings.forms.name}
      />
    );
  }

  renderDocumentField(field) {
    return (
      <FormInput
        field={field}
        name="document"
        includeIcon="linearicon-profile"
        placeholder={this.props.strings.forms.document}
      />
    );
  }

  renderPhoneField(field) {
    return (
      <FormInput
        field={field}
        name="phone"
        includeIcon="linearicon-phone"
        placeholder={this.props.strings.forms.phone}
      />
    );
  }

  render() {
    const countries = {
      1: {
        id: 1,
        name: 'Perú',
      },
      2: {
        id: 2,
        name: 'Estados Unidos',
      },
      3: {
        id: 3,
        name: 'Argentina',
      },
    };

    const documentTypes = {
      1: {
        id: 1,
        name: 'DNI',
      },
      2: {
        id: 2,
        name: 'RUC',
      },
      3: {
        id: 3,
        name: 'OTROS',
      },
    };

    const customerTypes = {
      1: {
        id: 1,
        name: 'Persona',
      },
      2: {
        id: 2,
        name: 'Empresa',
      },
    };

    const businessareas = {
      1: {
        id: 1,
        name: 'Agricultura, ganadería, silvicultura y pesca',
      },
      2: {
        id: 2,
        name: 'Explotación de minas y canteras',
      },
      3: {
        id: 3,
        name: 'Industrias manufactureras',
      },
    };

    const languages = {
      1: {
        id: 1,
        name: 'Español',
      },
      2: {
        id: 2,
        name: 'Inglés',
      },
    };

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.container}>
          <article>
            <Field
              name="user"
              component={this.renderUserField}
            />
          </article>
          <article>
            <Field
              name="email"
              component={this.renderEmailField}
            />
          </article>
          <article>
            <Field
              name="name"
              component={this.renderNameField}
            />
          </article>
          <article>
            <FormInput
              name="lastname"
              includeIcon="linearicon-edit"
              placeholder={this.props.strings.forms.lastname}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-earth"
              placeholder={this.props.strings.forms.country}
              options={countries}
            />
          </article>
          <article>
            <Field
              name="phone"
              component={this.renderPhoneField}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-register"
              placeholder={this.props.strings.forms.documentType}
              options={documentTypes}
            />
          </article>
          <article>
            <Field
              name="document"
              component={this.renderDocumentField}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-users"
              placeholder={this.props.strings.forms.personType}
              options={customerTypes}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-library"
              placeholder={this.props.strings.forms.bussinessarea}
              options={businessareas}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-earth"
              placeholder={this.props.strings.forms.language}
              options={languages}
              selected={languages['1']}
              changeSelected={this.changeLanguage}
            />
          </article>
          <FormButton
            callToAction={this.props.strings.userData.title}
            type="submit"
          />
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.get('user')) errors.user = 'Ingresa un usuario';
  if (!values.get('email')) errors.email = 'Ingresa un email';

  if (!values.get('email')) {
    errors.email = 'Ingresa tu correo';
  } else if (!regex.validate.email.test(values.get('email'))) {
    errors.email = regex.message.email;
  }

  if (!values.get('name')) errors.name = 'Ingresa un nombre';
  if (!values.get('document')) errors.document = 'Ingresa un número de documento';
  if (!values.get('phone')) errors.phone = 'Ingresa un número de teléfono';

  return errors;
}

UserDataForm.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

const UserDataReduxForm = reduxForm({
  form: 'UserDataForm',
  validate,
})(UserDataForm);
export default connect(mapStateToProps, { setLanguage })(UserDataReduxForm);
