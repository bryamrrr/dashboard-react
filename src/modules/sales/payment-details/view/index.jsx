import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { setRoute } from '../../../../reducers/routes/actions';

class PaymentDetails extends Component {
  componentDidMount() {
    this.props.setRoute({ title: 'Compra' });
  }

  render() {
    return (
      <div>Payment details</div>
    );
  }
}

PaymentDetails.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(PaymentDetails);
