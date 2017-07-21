import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function BillTable(props) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>{props.strings.tables.orderCode}</th>
            <th>{props.strings.tables.bill}</th>
            <th>{props.strings.tables.numBill}</th>
            <th>{props.strings.tables.creationDate}</th>
            <th>{props.strings.tables.outcome}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(item =>
            <tr key={item.id}>
              <td>{item.order.code}</td>
              <td>{item.paymentDocType.name}</td>
              <td>{item.voucher}</td>
              <td>{item.created.substr(0, 10)}</td>
              <td>{`${item.currency.symbol} ${item.total}`}</td>
              <td className={styles.tdButton}>
                <ButtonIcon icon="linearicon-eye" />
              </td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  );
}

BillTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(BillTable);
