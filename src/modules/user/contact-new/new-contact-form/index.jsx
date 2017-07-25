import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import regex from '../../../../regex';

import { showToaster } from '../../../../reducers/toaster/actions';

import styles from './styles.css';

class NewContactForm extends Component {
  constructor(props, context) {
    super(props, context);
    const { countries, documentTypes, contactTypes, notificationTypes, departments } = this.props;

    this.state = {
      countries,
      documentTypes,
      contactTypes,
      notificationTypes,
      departments,
      cities: [],
      districts: [],
      country: {},
      department: {},
      city: {},
      district: {},
      peru: false,
      contactType: {},
      notificationType: {},
      sending: false,
    };

    this.changeDocumentType = this.changeDocumentType.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);
    this.changeContactType = this.changeContactType.bind(this);
    this.changeNotificationType = this.changeNotificationType.bind(this);

    this.renderField = this.renderField.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    this.setState({ sending: true });

    const data = {
      name: values.get('name'),
      lastname: values.get('lastname'),
      contactTypeId: this.state.contactType.id,
      documentTypeId: this.state.documentType.id,
      documentId: values.get('document'),
      email: values.get('email'),
      countryId: this.state.country.id,
      phone: values.get('phone'),
      address: values.get('address'),
      notificationTypesId: [this.state.notificationType.id],
    };

    if (values.get('stateCity')) data.stateCity = values.get('stateCity');
    if (values.get('reference')) data.reference = values.get('reference');
    if (values.get('postcalCode')) data.reference = values.get('postcalCode');
    if (!_.isEmpty(this.state.district)) data.ubigeoId = this.state.district.id;

    const url = `${constants.urls.API_SONQO}/contacts`;
    await httpRequest('POST', url, data);

    this.setState({ sending: false });
    this.props.showToaster('success', 'Se agregó un nuevo contacto');

    const urlRedirect = '/usuario/contactos';
    this.context.router.history.push(urlRedirect);
  }

  changeDocumentType(documentType) {
    this.setState({ documentType });
  }

  changeCountry(country) {
    this.setState({
      country,
      peru: country.code === 'PE',
    });
  }

  async changeDepartment(department) {
    const url = `${constants.urls.API_SONQO}/ubigeos?sort=name&limit=all&parentCode=${department.locationCode}`;
    const { data: { results } } = await httpRequest('GET', url);

    this.setState({
      department,
      city: {},
      district: {},
      cities: results,
    });
  }

  async changeCity(city) {
    const url = `${constants.urls.API_SONQO}/ubigeos?sort=name&limit=all&parentCode=${city.locationCode}`;
    const { data: { results } } = await httpRequest('GET', url);

    this.setState({
      city,
      district: {},
      districts: results,
    });
  }

  changeDistrict(district) {
    this.setState({ district });
  }

  changeContactType(contactType) {
    this.setState({ contactType });
  }

  changeNotificationType(notificationType) {
    this.setState({ notificationType });
  }

  renderField(field) {
    const { name } = field.input;

    let icon = '';
    switch (name) {
      case 'name' || 'lastname':
        icon = 'linearicon-user';
        break;
      case 'envelope':
        icon = 'linearicon-envelope';
        break;
      case 'phone':
        icon = 'linearicon-phone';
        break;
      case 'profile':
        icon = 'linearicon-profile';
        break;
      case 'stateCity':
        icon = 'linearicon-flag2';
        break;
      case 'address' || 'postalCode':
        icon = 'linearicon-map-marker';
        break;
      case 'reference':
        icon = 'linearicon-road-sign';
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
      />
    );
  }

  render() {
    const style = (this.state.peru)
      ? { display: 'block' }
      : { display: 'none' };

    const noPeru = (!this.state.peru)
      ? { display: 'block' }
      : { display: 'none' };

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.container}>
        <article>
          <Field
            name="name"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="lastname"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="email"
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
            options={_.mapKeys(this.state.documentTypes, 'id')}
            changeSelected={this.changeDocumentType}
            selected={this.state.documentType}
          />
        </article>
        <article>
          <Field
            name="document"
            component={this.renderField}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-earth"
            placeholder={this.props.strings.forms.country}
            options={_.mapKeys(this.state.countries, 'id')}
            changeSelected={this.changeCountry}
            selected={this.state.country}
          />
        </article>
        <article style={style}>
          <Combo
            includeIcon="linearicon-flag2"
            placeholder={this.props.strings.forms.department}
            options={_.mapKeys(this.state.departments, 'id')}
            changeSelected={this.changeDepartment}
            selected={this.state.department}
          />
        </article>
        <article style={style}>
          <Combo
            includeIcon="linearicon-flag2"
            placeholder={this.props.strings.forms.city}
            options={_.mapKeys(this.state.cities, 'id')}
            changeSelected={this.changeCity}
            selected={this.state.city}
          />
        </article>
        <article style={style}>
          <Combo
            includeIcon="linearicon-flag2"
            placeholder={this.props.strings.forms.district}
            options={_.mapKeys(this.state.districts, 'id')}
            changeSelected={this.changeDistrict}
            selected={this.state.district}
          />
        </article>
        <article style={noPeru}>
          <Field
            name="stateCity"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="address"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="reference"
            component={this.renderField}
          />
        </article>
        <article>
          <Field
            name="postalCode"
            component={this.renderField}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-users"
            placeholder={this.props.strings.forms.contactType}
            options={_.mapKeys(this.state.contactTypes, 'id')}
            changeSelected={this.changeContactType}
            selected={this.state.contactType}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-comments"
            placeholder={this.props.strings.forms.notificationType}
            options={_.mapKeys(this.state.notificationTypes, 'id')}
            changeSelected={this.changeNotificationType}
            selected={this.state.notificationType}
          />
        </article>
        <FormButton
          callToAction={this.props.strings.userContacts.createContact}
          loading={this.state.sending}
          type="submit"
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.get('name')) errors.name = 'Ingresa un nombre';
  if (!values.get('lastname')) errors.lastname = 'Ingresa un apellido';
  if (!values.get('email')) errors.email = 'Ingresa un correo';
  if (!values.get('phone')) errors.phone = 'Ingresa un teléfono';
  if (!values.get('address')) errors.address = 'Ingresa una dirección';

  if (!values.get('email')) {
    errors.email = 'Ingresa tu correo electrónico';
  } else if (!regex.validate.email.test(values.get('email'))) {
    errors.email = regex.message.email;
  }

  return errors;
}

NewContactForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  contactTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  notificationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  departments: PropTypes.arrayOf(PropTypes.object).isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

NewContactForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

const NewContactReduxForm = reduxForm({
  form: 'NewContactForm',
  validate,
})(NewContactForm);

export default connect(mapStateToProps, { showToaster })(NewContactReduxForm);
