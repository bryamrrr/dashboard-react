import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';

import BillTable from '../bill-table';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserBill extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis datos' }, { title: 'Comprobantes' });
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-papers" />
          </Hexagon>
          <h2>Mis comprobantes</h2>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <TableSearch />
          </div>
          <div className={styles.buttonContainer} />
        </div>
        <BillTable />
        <TablePagination />
      </div>
    );
  }
}

UserBill.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserBill);
