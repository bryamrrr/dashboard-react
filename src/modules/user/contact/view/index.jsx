import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';
import ContactTable from '../contact-table';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      contacts: [],
      metadata: {},
      initialPage: 1,
      term: '',
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'contacts' });

    const url = `${constants.urls.API_SONQO}/contacts?includes=country,documentType&sort=name`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      contacts: results,
      metadata,
    });
  }

  async onChangePage(page) {
    this.setState({ fetchingData: true });

    const offset = (page - 1) * 10;

    const url = `${constants.urls.API_SONQO}/contacts?includes=country,documentType&sort=name&offset=${offset}&name__like=${this.state.term}`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      contacts: results,
      metadata,
      initialPage: page,
    });
  }

  async onSearch(term) {
    this.setState({ fetchingData: true });

    const url = `${constants.urls.API_SONQO}/contacts?includes=country,documentType&sort=name&name__like=${term}`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      contacts: results,
      metadata,
      initialPage: 1,
      term,
    });
  }

  render() {
    return (
      <div>
        {(this.state.fetchingData &&
          <LoadingSpin />
        )}
        {(!this.state.fetchingData &&
          <div>
            <div className={styles.title}>
              <Hexagon color="orange">
                <i className="linearicon-users2" />
              </Hexagon>
              <h2>{this.props.strings.userContacts.title}</h2>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.searchContainer}>
                <TableSearch
                  onSearch={this.onSearch}
                  term={this.state.term}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Link to="/usuario/nuevo-contacto">
                  <FormButton
                    callToAction={this.props.strings.userContacts.newContact}
                  />
                </Link>
              </div>
            </div>
            <ContactTable
              data={this.state.contacts}
            />
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

UserContact.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserContact);
