import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';
import AddressTable from '../address-table';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingAddresses: true,
      addresses: [],
      metadata: {},
      initialPage: 1,
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'addresses' });

    const url = `${constants.urls.API_SONQO}/addresses?includes=country,addressType`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingAddresses: false,
      addresses: results,
      metadata,
    });
  }

  async onChangePage(page) {
    this.setState({ fetchingAddresses: true });

    const offset = (page - 1) * 10;

    const url = `${constants.urls.API_SONQO}/addresses?includes=country,addressType&offset=${offset}&name__like=${this.state.term}`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingAddresses: false,
      addresses: results,
      metadata,
      initialPage: page,
    });
  }

  async onSearch(term) {
    this.setState({ fetchingAddresses: true });

    const url = `${constants.urls.API_SONQO}/addresses?includes=country,addressType&address__like=${term}`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingAddresses: false,
      addresses: results,
      metadata,
      initialPage: 1,
      term,
    });
  }

  render() {
    return (
      <div>
        {(this.state.fetchingAddresses &&
          <div>
            <LoadingSpin />
          </div>
        )}
        {(!this.state.fetchingAddresses &&
          <div>
            <div className={styles.title}>
              <Hexagon color="orange">
                <i className="linearicon-map-marker" />
              </Hexagon>
              <h2>{this.props.strings.userAddresses.title}</h2>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.searchContainer}>
                <TableSearch
                  onSearch={this.onSearch}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Link to="/usuario/nueva-direccion">
                  <FormButton
                    callToAction={this.props.strings.userAddresses.newAddress}
                  />
                </Link>
              </div>
            </div>
            <AddressTable data={this.state.addresses} />
            <TablePagination
              count={this.state.metadata.count}
              onChangePage={this.onChangePage}
              initialPage={this.state.initialPage}
            />
          </div>
        )}
      </div>
    );
  }
}

UserAddress.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserAddress);
