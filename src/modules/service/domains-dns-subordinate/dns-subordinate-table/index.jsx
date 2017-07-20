import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function DnsSubordinateTable(props) {
  return (
    <div className={`${styles.container} table-container`}>
      <table>
        <thead>
          <tr>
            <th>Hostname</th>
            <th>IP</th>
            <th>{props.strings.tables.state}</th>
            <th>{props.strings.tables.registrationDate}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ns1.qipmapunku.org</td>
            <td>192.168.2.23</td>
            <td>Activo</td>
            <td>10/09/2017</td>
            <td className={styles.tdButton}>
              <div className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-pencil"
                  tooltip={props.strings.tooltips.edit}
                />
                <ButtonIcon
                  icon="linearicon-trash2"
                  tooltip={props.strings.tooltips.delete}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>ns1.qipmapunku.org</td>
            <td>2001:db8:85a3:0:0:8a2e:370:7334</td>
            <td>Pendiente</td>
            <td>10/08/2017</td>
            <td className={styles.tdButton}>
              <div className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-pencil"
                  tooltip={props.strings.tooltips.edit}
                />
                <ButtonIcon
                  icon="linearicon-trash2"
                  tooltip={props.strings.tooltips.delete}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

DnsSubordinateTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(DnsSubordinateTable);
