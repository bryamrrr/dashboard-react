import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function RegisterTable(props) {
  return (
    <div className={`${styles.container} table-container`}>
      <table>
        <thead>
          <tr>
            <th>{props.strings.tables.name}</th>
            <th>{props.strings.tables.type}</th>
            <th>{props.strings.tables.content}</th>
            <th>{props.strings.tables.duration}</th>
            <th>{props.strings.tables.priority}</th>
            <th>{props.strings.tables.creationDate}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>qiqmapunku.org</td>
            <td>NS</td>
            <td>NS1.YACHAY.PE</td>
            <td>7200</td>
            <td>0</td>
            <td>13/11/2012 17:30</td>
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
            <td>qiqmapunku.org</td>
            <td>NS</td>
            <td>NS2.YACHAY.PE</td>
            <td>7200</td>
            <td>0</td>
            <td>13/11/2012 17:30</td>
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
            <td>qiqmapunku.org</td>
            <td>MX</td>
            <td>qiqmapunku.org</td>
            <td>7200</td>
            <td>10</td>
            <td>12/11/2012 17:30</td>
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
            <td>www.qiqmapunku.org</td>
            <td>CNAME</td>
            <td>qiqmapunku.org</td>
            <td>7200</td>
            <td>0</td>
            <td>12/11/2012 17:30</td>
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
            <td>qiqmapunku.org</td>
            <td>A</td>
            <td>163.143.120.206</td>
            <td>7200</td>
            <td>0</td>
            <td>12/11/2012 17:30</td>
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

RegisterTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(RegisterTable);
