import React from 'react';
import PropTypes from 'prop-types';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function ContactTable(props) {
  return (
    <div className="table-container">
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
          {props.data.map(item =>
            <tr key={item.id}>
              <td>{item.name} {item.lastname}</td>
              <td>{item.country.code}</td>
              <td>{item.documentType.name}</td>
              <td>{item.documentId}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td className={styles.tdButton}>
                <ButtonIcon icon="linearicon-pencil" />
              </td>
              <td className={styles.tdButton}>
                <ButtonIcon icon="linearicon-trash2" />
              </td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  );
}

ContactTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContactTable;
