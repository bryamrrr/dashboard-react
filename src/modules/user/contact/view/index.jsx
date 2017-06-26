import React from 'react';

import { Link } from 'react-router-dom';

import UserContactTable from '../user-contact-table';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';

import styles from './styles.css';

function UserContact() {
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
      <UserContactTable />
      <TablePagination />
    </div>
  );
}

export default UserContact;
