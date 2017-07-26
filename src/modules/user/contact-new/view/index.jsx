import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import NewContactForm from '../new-contact-form';
import Hexagon from '../../../../components/hexagon';
import LoadingIcon from '../../../../components/loading-icon';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserContactNew extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fetchingData: true,
      countries: [],
      documentTypes: [],
      contactTypes: [],
      notificationTypesId: [],
      departments: [],
      data: {},
    };
  }

  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'contacts' }, { title: 'new' });

    const urlCountries = `${constants.urls.API_SONQO}/countries?limit=all`;
    const promiseCountries = httpRequest('GET', urlCountries);

    const urlDocumentTypes = `${constants.urls.API_SONQO}/documenttypes`;
    const promiseDocumentTypes = httpRequest('GET', urlDocumentTypes);

    const urlContactTypes = `${constants.urls.API_SONQO}/contacttypes`;
    const promiseContactTypes = httpRequest('GET', urlContactTypes);

    const urlNotificationTypes = `${constants.urls.API_SONQO}/notificationtypes`;
    const promiseNotificationTypes = httpRequest('GET', urlNotificationTypes);

    const urlDepartments = `${constants.urls.API_SONQO}/ubigeos?parentCode=null&sort=name&limit=all`;
    const promiseDepartments = httpRequest('GET', urlDepartments);

    const allPromise = Promise.all([
      promiseCountries,
      promiseDocumentTypes,
      promiseContactTypes,
      promiseNotificationTypes,
      promiseDepartments,
    ]);

    allPromise.then(async (response) => {
      let data = {};
      const id = this.context.router.route.match.params.id;
      if (id) {
        const url = `${constants.urls.API_SONQO}/contacts/${id}?includes=ubigeo`;
        const dataAddress = await httpRequest('GET', url);

        data = dataAddress.data;
      }

      return this.setState({
        fetchingData: false,
        countries: response[0].data.results,
        documentTypes: response[1].data.results,
        contactTypes: response[2].data.results,
        notificationTypesId: response[3].data.results,
        departments: response[4].data.results,
        data,
      });
    });
  }

  render() {
    const title = (_.isEmpty(this.state.data))
      ? this.props.strings.userContacts.newContact
      : this.props.strings.userContacts.editContact;

    return (
      <div>
        {(this.state.fetchingData && <LoadingIcon />)}
        {(!this.state.fetchingData &&
          <div>
            <div className={styles.title}>
              <Hexagon color="orange">
                <i className="linearicon-user" />
              </Hexagon>
              <h2>{title}</h2>
            </div>
            <NewContactForm
              countries={this.state.countries}
              documentTypes={this.state.documentTypes}
              contactTypes={this.state.contactTypes}
              notificationTypesId={this.state.notificationTypesId}
              departments={this.state.departments}
              data={this.state.data}
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

UserContactNew.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserContactNew);
