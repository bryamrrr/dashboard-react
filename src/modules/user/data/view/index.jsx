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
        <CoverPhoto title={this.props.strings.userData.title} />
        <div className={styles.form}>
          <UserDataForm />
        </div>
      </div>
    );
  }
}

UserData.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(UserData);
