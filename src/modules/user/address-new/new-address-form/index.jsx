import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function NewAddressForm(props) {
  const countries = {
    1: {
      id: '1',
      name: 'Perú',
    },
    2: {
      id: '2',
      name: 'Estados Unidos',
    },
    3: {
      id: '3',
      name: 'Argentina',
    },
  };

  const types = {
    1: {
      id: '1',
      name: 'Fiscal',
    },
    2: {
      id: '2',
      name: 'Envío',
    },
  };

  return (
    <div className={styles.container}>
      <article>
        <Combo
          includeIcon="linearicon-earth"
          placeholder={props.strings.forms.country}
          options={countries}
        />
      </article>
      <article>
        <FormInput
          name="address"
          includeIcon="linearicon-map-marker"
          placeholder={props.strings.forms.address}
        />
      </article>
      <article>
        <FormInput
          name="reference"
          includeIcon="linearicon-road-sign"
          placeholder={props.strings.forms.reference}
        />
      </article>
      <article>
        <FormInput
          name="ubigeo"
          includeIcon="linearicon-location"
          placeholder={props.strings.forms.location}
        />
      </article>
      <article>
        <FormInput
          name="postalcode"
          includeIcon="linearicon-map-marker"
          placeholder={props.strings.forms.postalCode}
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-register"
          placeholder={props.strings.forms.type}
          options={types}
        />
      </article>
      <FormButton
        callToAction={props.strings.userAddresses.createAddress}
      />
    </div>
  );
}

NewAddressForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(NewAddressForm);
