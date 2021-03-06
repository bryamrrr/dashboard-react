import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UserPasswordForm from '../user-password-form';
import CoverPhoto from '../../coverphoto';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserPassword extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'password' });
  }

  render() {
    return (
      <div className={styles.container}>
        <CoverPhoto title={this.props.strings.changePassword.title} />
        <div className={styles.form}>
          <UserPasswordForm />
        </div>
      </div>
    );
  }
}

UserPassword.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserPassword);
