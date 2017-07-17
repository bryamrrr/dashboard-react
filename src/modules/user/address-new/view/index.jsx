import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import NewAddressForm from '../new-address-form';
import Hexagon from '../../../../components/hexagon';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserAddressNew extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'addresses' }, { title: 'new' });
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-user" />
          </Hexagon>
          <h2>{this.props.strings.userAddresses.newAddress}</h2>
        </div>
        <NewAddressForm />
      </div>
    );
  }
}

UserAddressNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserAddressNew);
