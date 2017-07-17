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
            <th>{props.strings.tables.income}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0101031298</td>
            <td>Factura electrónica</td>
            <td>F 001- 00034411</td>
            <td>29/05/2017</td>
            <td>S/ 257</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-eye" />
            </td>
          </tr>
          <tr>
            <td>0101031299</td>
            <td>Nota crédito electrónica</td>
            <td>NC 001- 00034411</td>
            <td>30/05/2017</td>
            <td>S/ 257</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-eye" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

BillTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(BillTable);
