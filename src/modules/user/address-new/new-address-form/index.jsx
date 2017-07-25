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

    this.state = {
      countries: _.mapKeys(this.props.countries, 'id'),
      addressTypes: _.mapKeys(this.props.addressTypes, 'id'),
      departments: _.mapKeys(this.props.departments, 'id'),
      cities: [],
      districts: [],
      country: {},
      department: {},
      city: {},
      district: {},
      addressType: {},
      peru: false,
      checked: false,
      sending: false,
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

  async componentWillMount() {
    if (!_.isEmpty(this.props.data)) {
      this.props.initialize({
        stateCity: this.props.data.stateCity,
        address: this.props.data.address,
        reference: this.props.data.reference,
        postalCode: this.props.data.postalCode,
      });

      let department = {};
      let city = {};
      let district = {};

      let cities = [];
      let districts = [];

      if (this.props.data.ubigeo) {
        const departmentCode = `${this.props.data.ubigeo.locationCode.substr(0, 2)}0000`;
        department = _.find(this.state.departments, { locationCode: departmentCode });

        const urlProvinces = `${constants.urls.API_SONQO}/ubigeos?parentCode=${departmentCode}&limit=all`;
        cities = await httpRequest('GET', urlProvinces);
        cities = cities.data.results;

        const provinceCode = `${this.props.data.ubigeo.locationCode.substr(0, 4)}00`;
        city = _.find(cities, { locationCode: provinceCode });

        const urlDistricts = `${constants.urls.API_SONQO}/ubigeos?parentCode=${provinceCode}&limit=all`;
        districts = await httpRequest('GET', urlDistricts);
        districts = districts.data.results;
        const districtCode = this.props.data.ubigeo.locationCode;
        district = _.find(districts, { locationCode: districtCode });
      }

      this.setState({
        checked: this.props.data.main,
        country: this.state.countries[this.props.data.countryId],
        addressType: this.state.addressTypes[this.props.data.addressTypeId],
        peru: this.state.countries[this.props.data.countryId].code === 'PE',
        department,
        cities,
        city,
        districts,
        district,
      });
    }
  }

  async onSubmit(values) {
    this.setState({ sending: true });

    const data = {
      countryId: this.state.country.id,
      address: values.get('address'),
      postalCode: values.get('postalCode'),
      addressTypeId: this.state.addressType.id,
      main: this.state.checked,
    };

    if (values.get('stateCity')) data.stateCity = values.get('stateCity');
    if (values.get('reference')) data.reference = values.get('reference');

    if (!_.isEmpty(this.state.district)) data.ubigeoId = this.state.district.id;

    if (!_.isEmpty(this.props.data)) {
      const url = `${constants.urls.API_SONQO}/addresses/${this.context.router.route.match.params.id}`;
      await httpRequest('PUT', url, data);

      this.setState({ sending: false });
      this.props.showToaster('success', 'Actualizado correctamente');
    } else {
      const url = `${constants.urls.API_SONQO}/addresses`;
      await httpRequest('POST', url, data);

      this.setState({ sending: false });
      this.props.showToaster('success', 'Se agregó una nueva dirección');
    }

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
    const title = (_.isEmpty(this.props.data))
      ? this.props.strings.userAddresses.newAddress
      : this.props.strings.userAddresses.editAddress;

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
            options={this.state.countries}
            changeSelected={this.changeCountry}
            selected={this.state.country}
          />
        </article>
        <article style={style}>
          <Combo
            includeIcon="linearicon-flag2"
            placeholder={this.props.strings.forms.department}
            options={this.state.departments}
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
            options={this.state.addressTypes}
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
          callToAction={title}
          loading={this.state.sending}
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
  initialize: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
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
