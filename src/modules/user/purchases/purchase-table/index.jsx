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
            <th>{props.strings.tables.order}</th>
            <th>{props.strings.tables.date}</th>
            <th>{props.strings.tables.state}</th>
            <th>{props.strings.tables.amoun}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0101031298</td>
            <td>29/05/2017</td>
            <td>Pagado</td>
            <td>S/ 288</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-eye" />
              <ButtonIcon icon="linearicon-papers" />
            </td>
          </tr>
          <tr>
            <td>0101031299</td>
            <td>29/05/2017</td>
            <td>Pendiente</td>
            <td>S/ 158</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-eye" />
              <ButtonIcon icon="linearicon-cart-full" />
              <ButtonIcon icon="linearicon-circle-cross" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

PurchaseTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(PurchaseTable);
