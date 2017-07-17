import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import ContactTable from '../contact-table';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserContact extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'contacts' });
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-users2" />
          </Hexagon>
          <h2>Mis contactos</h2>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <TableSearch />
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/usuario/nuevo-contacto">
              <FormButton
                callToAction="Nuevo contacto"
                includeIcon="linearicon-user"
              />
            </Link>
          </div>
        </div>
        <ContactTable />
        <TablePagination />
      </div>
    );
  }
}

UserContact.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserContact);
