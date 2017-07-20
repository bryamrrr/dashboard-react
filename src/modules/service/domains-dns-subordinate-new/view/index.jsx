import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';

import DnsSubordinateForm from '../dns-subordinate-form';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainDnsSubordinateNew extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' }, { title: 'dnsSubordinate' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="orange">
              <i className="linearicon-papers" />
            </Hexagon>
            <h2>Nuevo DNS subordinado</h2>
          </div>
          <p>Completa el formulario para crear un nuevo DNS subordinado</p>
        </div>
        <DnsSubordinateForm />
      </div>
    );
  }
}

DomainDnsSubordinateNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(DomainDnsSubordinateNew);
