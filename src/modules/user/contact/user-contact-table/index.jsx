import React from 'react';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function UserContactForm() {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Nombre / Razón social</th>
            <th>País</th>
            <th>Tipo Doc.</th>
            <th>Num Doc.</th>
            <th>Correo electrónico</th>
            <th>Teléfono</th>
            <th colSpan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rosario Camacho</td>
            <td>PE</td>
            <td>DNI</td>
            <td>43678265</td>
            <td>katy11@gmail.com</td>
            <td>2431245</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-pencil" />
            </td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-trash2" />
            </td>
          </tr>
          <tr>
            <td>Rosario Ponce</td>
            <td>CO</td>
            <td>OTRO</td>
            <td>45345671</td>
            <td>paola_cespedes@rcp.pe</td>
            <td>994678965</td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-pencil" />
            </td>
            <td className={styles.tdButton}>
              <ButtonIcon icon="linearicon-trash2" />
            </td>
          </tr>
          <tr>
            <td>Virgen del Rosario S.A.</td>
            <td>PE</td>
            <td>RUC</td>
            <td>1023456477</td>
            <td>julio15@gmail.com</td>
            <td>999567846</td>
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

export default UserContactForm;
