import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import UserDataForm from '../user-data-form';
import CoverPhoto from '../../coverphoto';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';
import { fetchProfile } from '../../../../reducers/user/actions';

import styles from './styles.css';

class UserData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      countries: [],
      documentTypes: [],
      customerTypes: [],
      businessAreas: [],
    };
  }

  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'user' });

    const urlCountries = `${constants.urls.API_SONQO}/countries?limit=all`;
    const promiseCountries = httpRequest('GET', urlCountries);

    const urlDocumentTypes = `${constants.urls.API_SONQO}/documenttypes`;
    const promiseDocumentTypes = httpRequest('GET', urlDocumentTypes);

    const urlCustomerTypes = `${constants.urls.API_SONQO}/customertypes`;
    const promiseCustomerTypes = httpRequest('GET', urlCustomerTypes);

    const urlBusinessAreas = `${constants.urls.API_SONQO}/businessareas`;
    const promiseBusinessAreas = httpRequest('GET', urlBusinessAreas);

    const allPromise = Promise.all([
      promiseCountries,
      promiseCustomerTypes,
      promiseDocumentTypes,
      promiseBusinessAreas,
    ]);

    allPromise.then(async (response) => {
      if (_.isEmpty(this.props.profile)) await this.props.fetchProfile();

      return this.setState({
        fetchingData: false,
        countries: response[0].data.results,
        customerTypes: response[1].data.results,
        documentTypes: response[2].data.results,
        businessAreas: response[3].data.results,
      });
    });
  }

  render() {
    return (
      <div>
        {(this.state.fetchingData && <LoadingSpin />)}

        {(!this.state.fetchingData &&
          <div>
            <CoverPhoto title={this.props.strings.userData.title} />
            <div className={styles.form}>
              <UserDataForm
                data={this.props.profile}
                countries={this.state.countries}
                documentTypes={this.state.documentTypes}
                customerTypes={this.state.customerTypes}
                businessAreas={this.state.businessAreas}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserData.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    strings: state.get('translate').strings,
    profile: state.get('user').profile,
  };
}

export default connect(mapStateToProps, {
  setRoute,
  fetchProfile,
})(UserData);
