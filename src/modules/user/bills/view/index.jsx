import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import Hexagon from '../../../../components/hexagon';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';
import LoadingSpin from '../../../../components/loading-spin';

import BillTable from '../bill-table';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingBills: true,
      bills: [],
    };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'bills' });

    const url = `${constants.urls.API_SONQO}/paymentdocs?includes=currency,order,paymentDocStatus,paymentDocType`;
    const { data: { results } } = await httpRequest('GET', url);

    this.setState({
      fetchingBills: false,
      bills: results,
    });
  }

  render() {
    return (
      <div>
        {(this.state.fetchingBills &&
          <div>
            <LoadingSpin />
          </div>
        )}
        {(!this.state.fetchingBills &&
          <div>
            <div className={styles.title}>
              <Hexagon color="orange">
                <i className="linearicon-papers" />
              </Hexagon>
              <h2>{this.props.strings.userBills.title}</h2>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.searchContainer}>
                <TableSearch />
              </div>
              <div className={styles.buttonContainer} />
            </div>
            <BillTable data={this.state.bills} />
            <TablePagination />
          </div>
        )}
      </div>
    );
  }
}

UserBill.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserBill);
