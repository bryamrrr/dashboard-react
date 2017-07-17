import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button-icon';
import Modal from '../../../../components/modal';

import ActivateForm from '../activate-form';

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
                <th>{this.props.strings.tables.codService}</th>
                <th>{this.props.strings.tables.package}</th>
                <th>{this.props.strings.tables.domainRel}</th>
                <th>{this.props.strings.tables.cpanelUser}</th>
                <th>{this.props.strings.tables.expirationDate}</th>
                <th>{this.props.strings.tables.state}</th>
                <th>{this.props.strings.tables.actions}</th>
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
                      tooltip={this.props.strings.tooltips.activate}
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
                    <ButtonIcon icon="linearicon-key" tooltip={this.props.strings.tooltips.restoreKey} />
                    <ButtonIcon icon="linearicon-gear" tooltip={this.props.strings.tooltips.manage} />
                    <ButtonIcon icon="linearicon-license2" tooltip={this.props.strings.tooltips.renew} />
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
                    <ButtonIcon icon="linearicon-license2" tooltip={this.props.strings.tooltips.renew} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {(this.state.modalActivate &&
          <Modal onClose={this.hideModalActivate} >
            <h2 className={styles.titleModal}>{this.props.strings.modals.activateHosting}</h2>
            <ActivateForm />
          </Modal>
        )}
      </div>
    );
  }
}

HostingTable.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(HostingTable);
