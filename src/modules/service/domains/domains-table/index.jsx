import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function DomainsTable(props) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>{props.strings.tables.codService}</th>
            <th>{props.strings.tables.service}</th>
            <th>{props.strings.tables.detail}</th>
            <th>{props.strings.tables.activationDate}</th>
            <th>{props.strings.tables.expirationDate}</th>
            <th>{props.strings.tables.state}</th>
            <th>{props.strings.tables.actions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>112568</td>
            <td>Dominio.com</td>
            <td>qiqmapunku.com</td>
            <td>27/10/2016 09:40</td>
            <td>27/10/2017</td>
            <td>Activo</td>
            <td className={styles.tdButton}>
              <div className={styles.tdButton}>
                <ButtonIcon
                  icon="linearicon-users2"
                  tooltip={props.strings.tooltips.contacts}
                  url="/servicios/dominios/contactos"
                />
                <ButtonIcon
                  icon="linearicon-register"
                  tooltip={props.strings.tooltips.registers}
                  url="/servicios/dominios/registros"
                />
                <ButtonIcon
                  icon="linearicon-papers"
                  tooltip="DNS"
                  url="/servicios/dominios/dns"
                />
                <ButtonIcon icon="linearicon-license" tooltip={props.strings.tooltips.renew} />
              </div>
            </td>
          </tr>
          <tr>
            <td>102658</td>
            <td>Dominio.pe</td>
            <td>qiqmapunku.pe</td>
            <td>27/10/2016 09:40</td>
            <td>27/10/2017</td>
            <td>Suspendido</td>
            <td>
              <div className={styles.tdButton}>
                <ButtonIcon icon="linearicon-users2" tooltip={props.strings.tooltips.contacts} />
              </div>
            </td>
          </tr>
          <tr>
            <td>085231</td>
            <td>Dominio.org</td>
            <td>qiqmapunku.org</td>
            <td>27/10/2016 09:40</td>
            <td>27/10/2017</td>
            <td>Eliminado</td>
            <td />
          </tr>
          <tr>
            <td>089342</td>
            <td>Dominio.net</td>
            <td>qiqmapunku.net</td>
            <td>27/10/2016 09:40</td>
            <td>27/10/2017</td>
            <td>Activado</td>
            <td>
              <div className={styles.tdButton}>
                <ButtonIcon icon="linearicon-users2" tooltip={props.strings.tooltips.contacts} />
                <ButtonIcon icon="linearicon-register" tooltip={props.strings.tooltips.registers} />
                <ButtonIcon icon="linearicon-papers" tooltip="DNS" />
                <ButtonIcon icon="linearicon-license" tooltip={props.strings.tooltips.renew} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

DomainsTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(DomainsTable);
