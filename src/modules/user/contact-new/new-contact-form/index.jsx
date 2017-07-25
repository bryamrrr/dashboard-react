import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function NewContactForm(props) {
  return (
    <div className={styles.container}>
      <article>
        <FormInput
          name="name"
          includeIcon="linearicon-user"
          placeholder={props.strings.forms.name}
        />
      </article>
      <article>
        <FormInput
          name="lastname"
          includeIcon="linearicon-user"
          placeholder={props.strings.forms.lastName}
        />
      </article>
      <article>
        <FormInput
          name="email"
          includeIcon="linearicon-envelope"
          placeholder={props.strings.forms.email}
        />
      </article>
      <article>
        <FormInput
          name="phone"
          includeIcon="linearicon-phone"
          placeholder={props.strings.forms.phone}
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-register"
          placeholder={props.strings.forms.documentType}
          options={props.documentTypes}
        />
      </article>
      <article>
        <FormInput
          name="document"
          includeIcon="linearicon-profile"
          placeholder={props.strings.forms.document}
        />
      </article>
      <article>
        <Combo
          includeIcon="linearicon-earth"
          placeholder={props.strings.forms.country}
          options={props.countries}
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
        <Combo
          includeIcon="linearicon-users"
          placeholder={props.strings.forms.personType}
          options={props.customerTypes}
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
          includeIcon="linearicon-comments"
          placeholder={props.strings.forms.notificationType}
          options={props.notificationTypes}
        />
      </article>
      <FormButton
        callToAction={props.strings.userContacts.createContact}
      />
    </div>
  );
}

NewContactForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  customerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  notificationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(NewContactForm);
