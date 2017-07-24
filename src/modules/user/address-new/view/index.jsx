import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import NewAddressForm from '../new-address-form';
import Hexagon from '../../../../components/hexagon';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddressNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      countries: [],
      addressTypes: [],
      departments: [],
    };
  }

  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'addresses' }, { title: 'new' });

    const urlCountries = `${constants.urls.API_SONQO}/countries?limit=all`;
    const promiseCountries = httpRequest('GET', urlCountries);

    const urlAddressTypes = `${constants.urls.API_SONQO}/addresstypes?limit=all`;
    const promiseDocumentTypes = httpRequest('GET', urlAddressTypes);

    const urlDepartments = `${constants.urls.API_SONQO}/ubigeos?parentCode=null&sort=name&limit=all`;
    const promiseDepartments = httpRequest('GET', urlDepartments);

    const allPromise = Promise.all([promiseCountries, promiseDocumentTypes, promiseDepartments]);

    allPromise.then(response =>
      this.setState({
        fetchingData: false,
        countries: response[0].data.results,
        addressTypes: response[1].data.results,
        departments: response[2].data.results,
      }),
    );
  }

  render() {
    return (
      <div>
        {(this.state.fetchingData && <LoadingSpin />)}
        {(!this.state.fetchingData &&
          <div>
            <div className={styles.title}>
              <Hexagon color="orange">
                <i className="linearicon-map-marker" />
              </Hexagon>
              <h2>{this.props.strings.userAddresses.newAddress}</h2>
            </div>
            <NewAddressForm
              countries={this.state.countries}
              addressTypes={this.state.addressTypes}
              departments={this.state.departments}
            />
          </div>
        )}
      </div>
    );
  }
}

UserAddressNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserAddressNew);
