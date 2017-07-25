import React from 'react';
import PropTypes from 'prop-types';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function AddressTable(props) {
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
          {props.data.map(item =>
            <tr key={item.id}>
              <td>{item.address}</td>
              <td>{item.country.code}</td>
              <td>{item.addressType.name}</td>
              <td className={styles.tdButton}>
                <ButtonIcon icon="linearicon-pencil" />
              </td>
              <td className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-trash2"
                  onClick={props.showDelete}
                  meta={{ item }}
                />
              </td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  );
}

AddressTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showDelete: PropTypes.func.isRequired,
};

export default AddressTable;
