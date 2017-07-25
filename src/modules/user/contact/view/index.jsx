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
import Modal from '../../../../components/modal';

import { setRoute } from '../../../../reducers/routes/actions';
import { showToaster } from '../../../../reducers/toaster/actions';

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
      showDelete: false,
      deleteId: '',
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
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

  showDeleteModal(meta) {
    this.setState({
      showDelete: true,
      deleteId: meta.item.id,
    });
  }

  hideModal() {
    this.setState({ showDelete: false });
  }

  async deleteContact() {
    const url = `${constants.urls.API_SONQO}/contacts/${this.state.deleteId}`;
    await httpRequest('DELETE', url);
    this.setState({ showDelete: false });
    this.props.showToaster('success', 'Eliminado correctamente');

    this.onChangePage(1);
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
              showDelete={this.showDeleteModal}
            />
            <TablePagination
              count={this.state.metadata.count}
              onChangePage={this.onChangePage}
              initialPage={this.state.initialPage}
            />
          </div>
        )}
        {(this.state.showDelete &&
          <Modal onClose={this.hideModal} >
            <h2 className={styles.titleModal}>¿Estás seguro de eliminar este contacto?</h2>
            <FormButton
              callToAction="No"
              onClick={this.hideModal}
            />
            <FormButton
              callToAction="Si"
              onClick={this.deleteContact}
            />
          </Modal>
        )}
      </div>
    );
  }
}

UserContact.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  showToaster: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, {
  setRoute,
  showToaster,
})(UserContact);
