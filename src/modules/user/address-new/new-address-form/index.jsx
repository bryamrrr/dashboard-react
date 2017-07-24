import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

class NewAddressForm extends Component {
  constructor(props) {
    super(props);

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
      peru: false,
    };

    this.changeCountry = this.changeCountry.bind(this);
    this.changeAddressTypes = this.changeAddressTypes.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);
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

  changeAddressTypes(addressTypes) {
    this.setState({ addressTypes });
  }

  render() {
    const style = (this.state.peru)
      ? { display: 'block' }
      : { display: 'none' };

    return (
      <div className={styles.container}>
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
        <article style={style}>
          <FormInput
            name="stateCity"
            includeIcon="linearicon-flag2"
            placeholder={this.props.strings.forms.stateCity}
          />
        </article>
        <article>
          <FormInput
            name="address"
            includeIcon="linearicon-map-marker"
            placeholder={this.props.strings.forms.address}
          />
        </article>
        <article>
          <FormInput
            name="reference"
            includeIcon="linearicon-road-sign"
            placeholder={this.props.strings.forms.reference}
          />
        </article>
        <article>
          <FormInput
            name="postalcode"
            includeIcon="linearicon-map-marker"
            placeholder={this.props.strings.forms.postalCode}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-register"
            placeholder={this.props.strings.forms.type}
            options={_.mapKeys(this.state.addressTypes, 'id')}
            changeSelected={this.changeAddressTypes}
          />
        </article>
        <FormButton
          callToAction={this.props.strings.userAddresses.createAddress}
        />
      </div>
    );
  }
}

NewAddressForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  addressTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  departments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(NewAddressForm);
