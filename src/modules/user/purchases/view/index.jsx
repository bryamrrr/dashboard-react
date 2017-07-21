import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import PurchaseTable from '../purchase-table';

import Hexagon from '../../../../components/hexagon';
import TableSearch from '../../../../components/table-search';
import TablePagination from '../../../../components/table-pagination';
import Combo from '../../../../components/combo';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserPurchases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingPurchases: true,
      purchases: [],
    };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'purchases' });

    const url = `${constants.urls.API_SONQO}/paymentdocs?includes=currency,order,paymentDocStatus`;
    const { data: { results } } = await httpRequest('GET', url);

    this.setState({
      fetchingPurchases: false,
      purchases: results,
    });
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
        {(this.state.fetchingPurchases &&
          <div>
            <LoadingSpin />
          </div>
        )}
        {(!this.state.fetchingPurchases &&
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
            <PurchaseTable data={this.state.purchases} />
            <TablePagination />
          </div>
        )}
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
