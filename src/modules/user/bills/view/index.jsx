import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';
import LoadingIcon from '../../../../components/loading-icon';

import BillTable from '../bill-table';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      bills: [],
      metadata: {},
      initialPage: 1,
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'bills' });

    const url = `${constants.urls.API_SONQO}/paymentdocs?includes=currency,order,paymentDocStatus,paymentDocType`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      bills: results,
      metadata,
    });
  }

  async onChangePage(page) {
    this.setState({ fetchingBills: true });

    const offset = (page - 1) * 10;

    const url = `${constants.urls.API_SONQO}/paymentdocs?includes=currency,order,paymentDocStatus,paymentDocType&offset=${offset}`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      bills: results,
      metadata,
      initialPage: page,
    });
  }

  render() {
    return (
      <div>
        {(this.state.fetchingData && <LoadingIcon />)}
        {(!this.state.fetchingData &&
          <div>
            <div className={styles.title}>
              <Hexagon color="orange">
                <i className="linearicon-papers" />
              </Hexagon>
              <h2>{this.props.strings.userBills.title}</h2>
            </div>
            <div className={styles.tableContainer}>
              <BillTable data={this.state.bills} />
            </div>
            <TablePagination
              count={this.state.metadata.count}
              onChangePage={this.onChangePage}
              initialPage={this.state.initialPage}
            />
          </div>
        )}
      </div>
    );
  }
}

UserBill.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserBill);
