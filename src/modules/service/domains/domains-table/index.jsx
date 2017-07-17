import React from 'react';

import ButtonIcon from '../../../../components/button-icon';

import styles from './styles.css';

function DomainsTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Cod. Servicio</th>
            <th>Servicio</th>
            <th>Detalle</th>
            <th>Fecha activación</th>
            <th>Fecha venc.</th>
            <th>Estado</th>
            <th>Acciones</th>
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
                  tooltip="Contactos"
                  url="/servicios/dominios/contactos"
                />
                <ButtonIcon
                  icon="linearicon-register"
                  tooltip="Registros"
                  url="/servicios/dominios/registros"
                />
                <ButtonIcon
                  icon="linearicon-papers"
                  tooltip="DNS"
                  url="/servicios/dominios/dns"
                />
                <ButtonIcon icon="linearicon-license" tooltip="Renovar" />
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
                <ButtonIcon icon="linearicon-users2" tooltip="Contactos" />
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
                <ButtonIcon icon="linearicon-users2" tooltip="Contactos" />
                <ButtonIcon icon="linearicon-register" tooltip="Registros" />
                <ButtonIcon icon="linearicon-papers" tooltip="DNS" />
                <ButtonIcon icon="linearicon-license" tooltip="Renovar" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DomainsTable;
