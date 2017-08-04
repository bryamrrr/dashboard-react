import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import PurchaseTable from '../purchase-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';
import LoadingIcon from '../../../../components/loading-icon';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserPurchases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      purchases: [],
      initialPage: 1,
      metadata: {},
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'purchases' });

    const url = `${constants.urls.API_SONQO}/orders?includes=currency,status`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      purchases: results,
      metadata,
    });
  }

  async onChangePage(page) {
    this.setState({ fetchingData: true });

    const offset = (page - 1) * 10;

    const url = `${constants.urls.API_SONQO}/orders?includes=currency,status&offset=${offset}`;
    const { data: { results, metadata } } = await httpRequest('GET', url);

    this.setState({
      fetchingData: false,
      purchases: results,
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
                <i className="linearicon-cart" />
              </Hexagon>
              <h2>{this.props.strings.userPurchases.title}</h2>
            </div>
            <div className={styles.tableContainer}>
              <PurchaseTable data={this.state.purchases} />
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

UserPurchases.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserPurchases);
