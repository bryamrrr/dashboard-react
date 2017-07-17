import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DomainsTable from '../domains-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddress extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="orange">
              <i className="linearicon-earth" />
            </Hexagon>
            <h2>Dominios</h2>
          </div>
          <p>Un dominio es el nombre que identifica tu sitio web en internet.</p>
        </div>
        <DomainsTable />
        <TablePagination />
      </div>
    );
  }
}

UserAddress.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserAddress);
