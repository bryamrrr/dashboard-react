import React from 'react';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function BillTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Código de órden</th>
            <th>Comprobante</th>
            <th>Nª de comprobante</th>
            <th>Fecha de creación</th>
            <th>Importe</th>
            <th>Acciones</th>
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

export default BillTable;