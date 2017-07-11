import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MailsTable from '../mails-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddress extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis servicios' }, { title: 'Correos' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="blue">
              <i className="linearicon-envelope" />
            </Hexagon>
            <h2>Correos</h2>
          </div>
          <p>{'El servicio de correo te permite personalizar la comunicación de tu empresa.'}</p>
        </div>
        <MailsTable />
        <TablePagination />
      </div>
    );
  }
}

UserAddress.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserAddress);
