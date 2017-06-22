import React from 'react';
import PropTypes from 'prop-types';

import Gravatar from 'react-gravatar';

import { connect } from 'react-redux';

import styles from './styles.css';

function Coverphoto(props) {
  return (
    <div className={styles.coverphoto} style={{ backgroundImage: `url(${props.context}/images/coverphoto.jpg)` }}>
      <figure className={styles.avatar}>
        <Gravatar
          email={props.auth.user.email}
          size={100}
        />
      </figure>
      <h2>Actualizar mis datos</h2>
    </div>
  );
}

Coverphoto.propTypes = {
  context: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
};

function mapStateToProps({ context, auth }) {
  return { context, auth };
}

export default connect(mapStateToProps)(Coverphoto);
