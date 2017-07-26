import React, { Component } from 'react';

import PropTypes from 'prop-types';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import LoadingIcon from '../../../../components/loading-icon';

class ConfirmEmail extends Component {
  async componentWillMount() {
    this.setState({ loading: true });

    const url = `${constants.urls.API_SECURITY}/confirm_email`;
    const data = { token: this.context.router.route.match.params.token };

    await httpRequest('PUT', url, data, { successMessage: 'Correo activado' });

    this.context.router.history.push('/login');
  }

  render() {
    return <LoadingIcon />;
  }
}

ConfirmEmail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ConfirmEmail;
