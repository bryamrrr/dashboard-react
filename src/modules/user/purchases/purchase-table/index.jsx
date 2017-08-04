import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function PurchaseTable(props) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>{props.strings.tables.orderCode}</th>
            <th>{props.strings.tables.date}</th>
            <th>{props.strings.tables.state}</th>
            <th>{props.strings.tables.amount}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(item =>
            <tr key={item.id}>
              <td>{item.code}</td>
              <td>{item.created.substr(0, 10)}</td>
              <td>{item.status.name}</td>
              <td>{`${item.currency.symbol} ${parseFloat(item.amount).toFixed(2)}`}</td>
              <td className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-eye"
                  tooltip="Ver detalle"
                  url={`/usuario/compras/${item.id}`}
                />
              </td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  );
}

PurchaseTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(PurchaseTable);
