import React, { Component } from 'react';
import PropTypes from 'prop-types';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import LoadingIcon from '../../../../components/loading-icon';

import styles from './styles.css';

class UserContactNew extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      urlPDF: '',
      fetchingData: true,
    };
  }

  async componentWillMount() {
    const id = this.context.router.route.match.params.id;
    if (id) {
      const urlPDF = `${constants.urls.API_SONQO}/paymentdocs/${id}`;
      await httpRequest('GET', urlPDF);
      this.setState({
        urlPDF,
        fetchingData: false,
      });
    }
  }

  render() {
    return (
      <div>
        {(this.state.fetchingData && <LoadingIcon />)}
        {(!this.state.fetchingData &&
          <div className={styles.container}>
            <iframe src={this.state.urlPDF} />
          </div>
        )}
      </div>
    );
  }
}

UserContactNew.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UserContactNew;
