import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hexagon from '../../../../components/hexagon';
import FormButton from '../../../../components/form-button';

import DnsSubordinateTable from '../dns-subordinate-table';

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
    this.props.setRoute({ title: 'services' }, { title: 'domains' }, { title: 'dnsSubordinate' });
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
            <h2>Administrar DNS subordinados</h2>
          </div>
        </div>
        <Link to="/servicios/dominios/nuevo-dnssubordinado" className={styles.buttonContainer}>
          <FormButton
            callToAction="Nueva DNS Subordinada"
          />
        </Link>
        <DnsSubordinateTable />
      </div>
    );
  }
}

DomainRegisterList.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainRegisterList);
