import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import NewContactForm from '../new-contact-form';
import Hexagon from '../../../../components/hexagon';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserContactNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      countries: [],
      documentTypes: [],
      customerTypes: [],
      notificationTypes: [],
      departments: [],
    };
  }

  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'contacts' }, { title: 'new' });

    const urlCountries = `${constants.urls.API_SONQO}/countries?limit=all`;
    const promiseCountries = httpRequest('GET', urlCountries);

    const urlDocumentTypes = `${constants.urls.API_SONQO}/documenttypes`;
    const promiseDocumentTypes = httpRequest('GET', urlDocumentTypes);

    const urlCustomerTypes = `${constants.urls.API_SONQO}/customertypes`;
    const promiseCustomerTypes = httpRequest('GET', urlCustomerTypes);

    const urlNotificationTypes = `${constants.urls.API_SONQO}/notificationtypes`;
    const promiseNotificationTypes = httpRequest('GET', urlNotificationTypes);

    const urlDepartments = `${constants.urls.API_SONQO}/ubigeos?parentCode=null&sort=name&limit=all`;
    const promiseDepartments = httpRequest('GET', urlDepartments);

    const allPromise = Promise.all([
      promiseCountries,
      promiseDocumentTypes,
      promiseCustomerTypes,
      promiseNotificationTypes,
      promiseDepartments,
    ]);

    allPromise.then(async response =>
      this.setState({
        fetchingData: false,
        countries: response[0].data.results,
        documentTypes: response[1].data.results,
        customerTypes: response[2].data.results,
        notificationTypes: response[3].data.results,
        departments: response[4].data.results,
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
                <i className="linearicon-user" />
              </Hexagon>
              <h2>{this.props.strings.userContacts.newContact}</h2>
            </div>
            <NewContactForm
              countries={this.state.countries}
              documentTypes={this.state.documentTypes}
              customerTypes={this.state.customerTypes}
              notificationTypes={this.state.notificationTypes}
              departments={this.state.departments}
            />
          </div>
        )}
      </div>
    );
  }
}

UserContactNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserContactNew);
