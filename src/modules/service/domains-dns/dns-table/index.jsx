import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function DnsTable(props) {
  return (
    <div className={`${styles.container} table-container`}>
      <table>
        <thead>
          <tr>
            <th>Hostname</th>
            <th>{props.strings.tables.type}</th>
            <th>IP</th>
            <th>{props.strings.tables.state}</th>
            <th>{props.strings.tables.creationDate}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ns1.yachay.pe</td>
            <td>Predeterminada</td>
            <td>161.132.5.55</td>
            <td>Activo</td>
            <td>17/08/2015 17:30</td>
            <td className={styles.tdButton}>
              <div className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-trash2"
                  tooltip={props.strings.tooltips.delete}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>ns2.yachay.pe</td>
            <td>Predeterminada</td>
            <td>216.21.12.188</td>
            <td>Activo</td>
            <td>17/08/2015 17:30</td>
            <td className={styles.tdButton}>
              <div className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-trash2"
                  tooltip={props.strings.tooltips.delete}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>ns1.qiqmapunku.org</td>
            <td>Subordinada</td>
            <td>192.168.2.23</td>
            <td>Pendiente</td>
            <td>10/08/2015 17:30</td>
            <td className={styles.tdButton}>
              <div className={styles.tdButton}>
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

DnsTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(DnsTable);
