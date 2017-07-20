import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import Modal from '../../../../components/modal';

import DnsForm from '../dns-form';
import DnsTable from '../dns-table';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainRegisterList extends Component {

  constructor(props) {
    super(props);

    this.state = { modalRegister: false };
    this.showModalDNS = this.showModalDNS.bind(this);
    this.hideModalDNS = this.hideModalDNS.bind(this);
  }

  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' }, { title: 'registers' });
  }

  showModalDNS() {
    this.setState({ modalRegister: true });
  }

  hideModalDNS() {
    this.setState({ modalRegister: false });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="orange">
              <i className="linearicon-register" />
            </Hexagon>
            <h2>DNS Asociados</h2>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <FormButton
            callToAction="Agregar DNS"
            includeIcon="linearicon-plus"
            onClick={this.showModalDNS}
          />
        </div>
        <DnsTable />
        {(this.state.modalRegister &&
          <Modal onClose={this.hideModalDNS} >
            <h2 className={styles.titleModal}>Agregar DNS</h2>
            <DnsForm />
          </Modal>
        )}
      </div>
    );
  }
}

DomainRegisterList.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainRegisterList);
