import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';
import Modal from '../../../../components/modal';

import RegisterForm from '../register-form';
import RegisterTable from '../register-table';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainRegisterList extends Component {

  constructor(props) {
    super(props);

    this.state = { modalRegister: false };
    this.showModalRegister = this.showModalRegister.bind(this);
    this.hideModalRegister = this.hideModalRegister.bind(this);
  }

  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' }, { title: 'registers' });
  }

  showModalRegister() {
    this.setState({ modalRegister: true });
  }

  hideModalRegister() {
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
            <h2>Registros DNS</h2>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <FormButton
            callToAction="Nuevo registro"
            includeIcon="linearicon-plus"
            onClick={this.showModalRegister}
          />
        </div>
        <RegisterTable />
        {(this.state.modalRegister &&
          <Modal onClose={this.hideModalRegister} >
            <h2 className={styles.titleModal}>Agregar registro</h2>
            <RegisterForm />
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
