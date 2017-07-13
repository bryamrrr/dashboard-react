import React from 'react';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function AddressTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Dirección</th>
            <th>País</th>
            <th>Tipo</th>
            <th colSpan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calle La Begonias 567 - Corpac San Isidro</td>
            <td>PE</td>
            <td>Fiscal</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-pencil" />
            </td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-trash2" />
            </td>
          </tr>
          <tr>
            <td>Calle Tubino 101 San Miguel - Lima</td>
            <td>PE</td>
            <td>Envío</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-pencil" />
            </td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-trash2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddressTable;
