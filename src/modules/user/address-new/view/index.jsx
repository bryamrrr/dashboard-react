import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import NewAddressForm from '../new-address-form';
import Hexagon from '../../../../components/hexagon';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddressNew extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis datos' }, { title: 'Direcciones' }, { title: 'Nueva' });
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-user" />
          </Hexagon>
          <h2>Nueva dirección</h2>
        </div>
        <NewAddressForm />
      </div>
    );
  }
}

UserAddressNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserAddressNew);
