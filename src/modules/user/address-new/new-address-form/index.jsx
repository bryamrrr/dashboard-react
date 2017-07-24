import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import CheckBox from '../../../../components/checkbox';
import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import { showToaster } from '../../../../reducers/toaster/actions';

import styles from './styles.css';

class NewAddressForm extends Component {
  constructor(props, context) {
    super(props, context);

    const { countries, addressTypes, departments } = this.props;

    this.state = {
      countries,
      addressTypes,
      departments,
      cities: [],
      districts: [],
      country: {},
      department: {},
      city: {},
      district: {},
      addressType: {},
      peru: false,
      checked: false,
    };

    this.changeCountry = this.changeCountry.bind(this);
    this.changeAddressTypes = this.changeAddressTypes.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.renderField = this.renderField.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
  }

  async onSubmit(values) {
    const data = {
      countryId: this.state.country.id,
      address: values.get('address'),
      postalCode: values.get('postalCode'),
      addressTypeId: this.state.addressType.id,
      main: this.state.checked,
    };

    if (values.get('stateCity')) data.stateCity = values.get('stateCity');
    if (values.get('reference')) data.reference = values.get('reference');
    if (values.get('ubigeoId')) data.ubigeoId = values.get('ubigeoId');

    const url = `${constants.urls.API_SONQO}/addresses`;
    await httpRequest('POST', url, data);
    this.props.showToaster('success', 'Se agregó una nueva dirección');

    const urlRedirect = '/usuario/direcciones';
    this.context.router.history.push(urlRedirect);
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

  changeAddressTypes(addressType) {
    this.setState({ addressType });
  }

  changeCheckbox(checked) {
    this.setState({ checked });
  }

  renderField(field) {
    const { name } = field.input;

    let icon = '';
    switch (name) {
      case 'stateCity':
        icon = 'linearicon-flag2';
        break;
      case 'address':
        icon = 'linearicon-map-marker';
        break;
      case 'reference':
        icon = 'linearicon-road-sign';
        break;
      case 'postalCode':
        icon = 'linearicon-map-marker';
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
            includeIcon="linearicon-register"
            placeholder={this.props.strings.forms.type}
            options={_.mapKeys(this.state.addressTypes, 'id')}
            changeSelected={this.changeAddressTypes}
            selected={this.state.addressType}
          />
        </article>
        <article>
          <CheckBox
            changeValue={this.changeCheckbox}
            checked={this.state.checked}
          >
            <span>Dirección principal</span>
          </CheckBox>
        </article>
        <FormButton
          callToAction={this.props.strings.userAddresses.createAddress}
          type="submit"
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.get('address')) errors.address = 'Ingresa una dirección';
  if (!values.get('postalCode')) errors.postalCode = 'Ingresa un código postal';

  return errors;
}

NewAddressForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  addressTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  departments: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

NewAddressForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

const NewAddressReduxForm = reduxForm({
  form: 'NewAddressForm',
  validate,
})(NewAddressForm);

export default connect(mapStateToProps, { showToaster })(NewAddressReduxForm);
