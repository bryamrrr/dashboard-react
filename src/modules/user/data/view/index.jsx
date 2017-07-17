import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UserDataForm from '../user-data-form';
import CoverPhoto from '../../coverphoto';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserData extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'data' }, { title: 'user' });
  }

  render() {
    return (
      <div>
        <CoverPhoto title="Actualizar mis datos" />
        <div className={styles.form}>
          <UserDataForm />
        </div>
      </div>
    );
  }
}

UserData.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserData);
