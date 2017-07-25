import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import { setLanguage } from '../../../../reducers/translate/actions';
import { setProfile } from '../../../../reducers/user/actions';
import { showToaster } from '../../../../reducers/toaster/actions';

import regex from '../../../../extra/regex';
import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import styles from './styles.css';

class UserDataForm extends Component {
  constructor(props) {
    super(props);

    const {
      country,
      documentType,
      customerType,
      businessArea,
      username,
      email,
      name,
      lastname,
      phone,
      documentId,
    } = this.props.data;

    this.state = {
      profile: {
        country,
        documentType,
        customerType,
        businessArea,
        username,
        email,
        name,
        lastname,
        phone,
        documentId,
      },
      sending: false,
    };

    this.changeLanguage = this.changeLanguage.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeDocumentType = this.changeDocumentType.bind(this);
    this.changeCustomerType = this.changeCustomerType.bind(this);
    this.changeBusinessArea = this.changeBusinessArea.bind(this);

    this.renderField = this.renderField.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.initialize({
      username: this.state.profile.username,
      email: this.state.profile.email,
      name: this.state.profile.name,
      lastname: this.state.profile.lastname,
      phone: this.state.profile.phone,
      documentId: this.state.profile.documentId,
    });
  }

  async onSubmit(values) {
    const profileToSend = {
      username: values.get('username'),
      email: values.get('email'),
      name: values.get('name'),
      lastname: values.get('lastname'),
      phone: values.get('phone'),
      documentId: values.get('documentId'),
      countryId: this.state.profile.country.id,
      documentTypeId: this.state.profile.documentType.id,
      customerTypeId: this.state.profile.customerType.id,
      businessAreaId: this.state.profile.businessArea.id,
    };

    const url = `${constants.urls.API_SONQO}/profile`;
    await httpRequest('PUT', url, profileToSend);
    this.props.showToaster('success', 'Los datos han sido actualizados');
    this.props.setProfile(profileToSend);
  }

  changeLanguage(data) {
    const language = (data.id === 1) ? 'es' : 'en';
    this.props.setLanguage(language);
  }

  changeCountry(country) {
    const profile = this.state.profile;
    profile.country = country;

    this.forceUpdate();
  }

  changeDocumentType(documentType) {
    const profile = this.state.profile;
    profile.documentType = documentType;

    this.forceUpdate();
  }

  changeCustomerType(customerType) {
    const profile = this.state.profile;
    profile.customerType = customerType;

    this.forceUpdate();
  }

  changeBusinessArea(businessArea) {
    const profile = this.state.profile;
    profile.businessArea = businessArea;

    this.forceUpdate();
  }

  renderField(field) {
    const { name } = field.input;

    let icon = '';
    let disabled = false;
    switch (name) {
      case 'username':
        icon = 'linearicon-user';
        disabled = true;
        break;
      case 'email':
        icon = 'linearicon-envelope';
        disabled = true;
        break;
      case 'documentId':
        icon = 'linearicon-profile';
        break;
      case 'phone':
        icon = 'linearicon-phone';
        break;
      default:
        icon = 'linearicon-edit';
    }

    return (
      <FormInput
        field={field}
        name={name}
        includeIcon={icon}
        placeholder={this.props.strings.forms[name]}
        disabled={disabled}
      />
    );
  }

  render() {
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

    const style = (this.state.profile.customerType.name === 'Persona')
      ? { display: 'block' }
      : { display: 'none' };

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.container}>
          <article>
            <Field
              name="username"
              component={this.renderField}
              value={this.state.profile.username}
            />
          </article>
          <article>
            <Field
              name="email"
              component={this.renderField}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-earth"
              placeholder={this.props.strings.forms.country}
              options={_.mapKeys(this.props.countries, 'id')}
              changeSelected={this.changeCountry}
              selected={this.state.profile.country}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-users"
              placeholder={this.props.strings.forms.personType}
              options={_.mapKeys(this.props.customerTypes, 'id')}
              changeSelected={this.changeCustomerType}
              selected={this.state.profile.customerType}
            />
          </article>
          <article>
            <Field
              name="name"
              component={this.renderField}
            />
          </article>
          <article style={style}>
            <Field
              name="lastname"
              component={this.renderField}
            />
          </article>
          <article>
            <Field
              name="phone"
              component={this.renderField}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-register"
              placeholder={this.props.strings.forms.documentType}
              options={_.mapKeys(this.props.documentTypes, 'id')}
              changeSelected={this.changeDocumentType}
              selected={this.state.profile.documentType}
            />
          </article>
          <article>
            <Field
              name="documentId"
              component={this.renderField}
            />
          </article>
          <article>
            <Combo
              includeIcon="linearicon-library"
              placeholder={this.props.strings.forms.bussinessarea}
              options={_.mapKeys(this.props.businessAreas, 'id')}
              changeSelected={this.changeBusinessArea}
              selected={this.state.profile.businessArea}
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

  if (!values.get('username')) errors.user = 'Ingresa un usuario';
  if (!values.get('email')) errors.email = 'Ingresa un email';

  if (!values.get('email')) {
    errors.email = 'Ingresa tu correo';
  } else if (!regex.validate.email.test(values.get('email'))) {
    errors.email = regex.message.email;
  }

  if (!values.get('name')) errors.name = 'Ingresa un nombre';
  if (!values.get('documentId')) errors.document = 'Ingresa un número de documento';
  if (!values.get('phone')) errors.phone = 'Ingresa un número de teléfono';

  return errors;
}

UserDataForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  customerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  businessAreas: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

const UserDataReduxForm = reduxForm({
  form: 'UserDataForm',
  validate,
})(UserDataForm);

export default connect(mapStateToProps, {
  setLanguage,
  setProfile,
  showToaster,
})(UserDataReduxForm);
