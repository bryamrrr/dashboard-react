import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import HostingTable from '../hosting-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddress extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis servicios' }, { title: 'Hosting' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="red">
              <i className="linearicon-drawer2" />
            </Hexagon>
            <h2>Hosting</h2>
          </div>
          <p>{'El servicio de hosting te permite almacenar tu página web en un servidor de internet.'}</p>
        </div>
        <HostingTable />
        <TablePagination />
      </div>
    );
  }
}

UserAddress.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserAddress);
