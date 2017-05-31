import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Gravatar from 'react-gravatar';

import styles from './styles.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  onBlur() {
    this.setState({ open: false });
  }

  render() {
    const className = (this.state.open)
      ? `${styles.optionsContainer} ${styles.isOpen}`
      : styles.optionsContainer;

    return (
      <div
        className={styles.container}
        tabIndex="0"
        onBlur={this.onBlur}
      >
        <div
          onClick={this.onClick}
          aria-hidden
        >
          <div className={styles.image}>
            <Gravatar
              email={this.props.auth.user.email}
              size={25}
            />
          </div>
          <h3 className={styles.title}>
            {this.props.auth.user.first_name}
          </h3>
          <i className={`${styles.icon} linearicon-chevron-down`} />
        </div>
        <div className={className}>
          <ul className={styles.list}>
            <li>
              <Link to="/usuario/datos">Mis datos</Link>
            </li>
            <li>
              <Link to="/usuario/contrasena">Cambiar contraseña</Link>
            </li>
            <li>
              <Link to="/usuario/contrasena">
                Salir
                <i className={`${styles.logoutIcon} linearicon-exit`} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Settings);
