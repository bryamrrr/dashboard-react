import React from 'react';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function PurchaseTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Acciones</th>
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

export default PurchaseTable;
