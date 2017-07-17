import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormInput from '../../../../components/form-input';

import styles from './styles.css';

function PaymentContactForm(props) {
  return (
    <div className={styles.container}>
      <FormInput
        name="name"
        includeIcon="linearicon-user"
        placeholder={props.strings.sales.reason}
      />
      <FormInput
        name="ruc"
        includeIcon="linearicon-profile"
        placeholder={props.strings.sales.ruc}
      />
      <FormInput
        name="address"
        includeIcon="linearicon-map-marker"
        placeholder={props.strings.sales.address}
      />
    </div>
  );
}

PaymentContactForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(PaymentContactForm);
