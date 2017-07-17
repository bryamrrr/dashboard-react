import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';

import RegisterForm from '../register-form';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainRegisterList extends Component {

  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' }, { title: 'registers' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="orange">
              <i className="linearicon-register" />
            </Hexagon>
            <h2>Registros de DNS</h2>
          </div>
        </div>
        <RegisterForm />
      </div>
    );
  }
}

DomainRegisterList.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainRegisterList);
