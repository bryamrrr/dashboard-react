import React from 'react';
import PropTypes from 'prop-types';

import Gravatar from 'react-gravatar';

import { connect } from 'react-redux';

import styles from './styles.css';

function Coverphoto(props) {
  const user = (props.auth.user) ? props.auth.user : {};
  return (
    <div className={styles.coverphoto} style={{ backgroundImage: `url(${props.context}/images/coverphoto.jpg)` }}>
      <figure className={styles.avatar}>
        <Gravatar
          email={user.email}
          size={130}
        />
      </figure>
      <h2 className={styles.title}>{props.title}</h2>
    </div>
  );
}

Coverphoto.propTypes = {
  context: PropTypes.string.isRequired,
  auth: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.get('context'),
    auth: state.get('auth'),
  };
}

export default connect(mapStateToProps)(Coverphoto);
