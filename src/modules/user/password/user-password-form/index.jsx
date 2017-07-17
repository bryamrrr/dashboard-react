import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function UserPasswordForm(props) {
  return (
    <div className={styles.container}>
      <article>
        <FormInput
          name="user"
          includeIcon="linearicon-user"
          placeholder={props.strings.forms.user}
        />
      </article>
      <article>
        <FormInput
          name="password"
          includeIcon="linearicon-key"
          placeholder={props.strings.forms.currentPassword}
        />
      </article>
      <article>
        <FormInput
          name="newPassword"
          includeIcon="linearicon-key"
          placeholder={props.strings.forms.newPassword}
        />
      </article>
      <article>
        <FormInput
          name="repeatNewPassword"
          includeIcon="linearicon-key"
          placeholder={props.strings.forms.repeatNewPassword}
        />
      </article>
      <FormButton
        callToAction={props.strings.changePassword.title}
      />
    </div>
  );
}

UserPasswordForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(UserPasswordForm);
