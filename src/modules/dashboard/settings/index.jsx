import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Gravatar from 'react-gravatar';

import { logoutUser } from '../../../reducers/auth/actions';

import styles from './styles.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.logout = this.logout.bind(this);
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  onBlur() {
    this.setState({ open: false });
  }

  logout() {
    this.props.logoutUser();
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
              <Link to="/usuario/cambiar-contraseña">Cambiar contraseña</Link>
            </li>
            <li>
              <a
                onClick={this.logout}
                aria-hidden
              >
                Salir
                <i className={`${styles.logoutIcon} linearicon-exit`} />
              </a>
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
  logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { auth: state.get('auth') };
}

function mapDispatchToProps(dispatch) {
  return { logoutUser: bindActionCreators(logoutUser, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
