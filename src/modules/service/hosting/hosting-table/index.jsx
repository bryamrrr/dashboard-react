import React, { Component } from 'react';

import ButtonIcon from '../../../../components/button-icon';
import Modal from '../../../../components/modal';

import styles from './styles.css';

class HostingTable extends Component {
  constructor(props) {
    super(props);

    this.state = { modalActivate: false };
    this.showModalActivate = this.showModalActivate.bind(this);
    this.hideModalActivate = this.hideModalActivate.bind(this);
  }

  showModalActivate() {
    this.setState({ modalActivate: true });
  }

  hideModalActivate() {
    this.setState({ modalActivate: false });
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cod. Servicio</th>
                <th>Paquete</th>
                <th>Dominio relacionado</th>
                <th>Usuario cPanel</th>
                <th>Fecha venc.</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1123456</td>
                <td>HOSTI 100</td>
                <td />
                <td />
                <td>22/05/2015</td>
                <td>Pendiente</td>
                <td className={styles.tdButton}>
                  <div className={styles.tdButton}>
                    <ButtonIcon
                      icon="linearicon-circle-checkmark"
                      tooltip="Activar"
                      onClick={this.showModalActivate}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>1024985</td>
                <td>Hosting Plus</td>
                <td>sac.pe</td>
                <td>soporte</td>
                <td>25/05/2015</td>
                <td>Activo</td>
                <td className={styles.tdButton}>
                  <div className={styles.tdButton}>
                    <ButtonIcon icon="linearicon-key" tooltip="Restablecer clave" />
                    <ButtonIcon icon="linearicon-gear" tooltip="Administrar" />
                    <ButtonIcon icon="linearicon-license2" tooltip="Renovar" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>1024788</td>
                <td>HOSTI 200</td>
                <td>dominio.pe</td>
                <td>soporte</td>
                <td>22/10/2015</td>
                <td>Suspendido</td>
                <td className={styles.tdButton}>
                  <div className={styles.tdButton}>
                    <ButtonIcon icon="linearicon-license2" tooltip="Renovar" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {(this.state.modalActivate &&
          <Modal onClose={this.hideModalActivate}>
            <h1>Hola mundo</h1>
            <p>Holis</p>
          </Modal>
        )}
      </div>
    );
  }
}

export default HostingTable;
