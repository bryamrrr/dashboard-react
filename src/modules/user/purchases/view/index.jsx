import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import PurchaseTable from '../purchase-table';

import Hexagon from '../../../../components/hexagon';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';
import Combo from '../../../../components/combo';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserPurchases extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'purchases' });
  }

  render() {
    const status = {
      1: {
        id: '1',
        name: 'Pagado',
      },
      2: {
        id: '2',
        name: 'Pendiente',
      },
    };

    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-cart" />
          </Hexagon>
          <h2>{this.props.strings.userPurchases.title}</h2>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <TableSearch />
          </div>
          <div className={styles.buttonContainer}>
            <Combo
              includeIcon="linearicon-register"
              placeholder={this.props.strings.userPurchases.state}
              options={status}
            />
          </div>
        </div>
        <PurchaseTable />
        <TablePagination />
      </div>
    );
  }
}

UserPurchases.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserPurchases);
