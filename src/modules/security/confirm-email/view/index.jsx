import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import LoadingIcon from '../../../../components/loading-icon';

import { confirmEmail } from '../../../../reducers/auth/actions';

class ConfirmEmail extends Component {
  async componentWillMount() {
    this.setState({ loading: true });

    const url = `${constants.urls.API_SECURITY}/confirm_email`;
    const data = { token: this.context.router.route.match.params.token };

    const { meta } = await httpRequest('PUT', url, data, { successMessage: 'Correo activado' });

    if (meta.ok) this.props.confirmEmail();
    this.context.router.history.push('/login');
  }

  render() {
    return <LoadingIcon />;
  }
}

ConfirmEmail.propTypes = {
  confirmEmail: PropTypes.func.isRequired,
};

ConfirmEmail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, { confirmEmail })(ConfirmEmail);
