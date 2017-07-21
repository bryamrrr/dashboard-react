import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import AddressTable from '../address-table';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddress extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'addresses' });
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-map-marker" />
          </Hexagon>
          <h2>{this.props.strings.userAddresses.title}</h2>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <TableSearch />
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/usuario/nueva-direccion">
              <FormButton
                callToAction={this.props.strings.userAddresses.newAddress}
              />
            </Link>
          </div>
        </div>
        <AddressTable />
        <TablePagination />
      </div>
    );
  }
}

UserAddress.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserAddress);
