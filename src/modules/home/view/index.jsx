import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Products from '../products';

import styles from './styles.css';

function Home(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{props.user.first_name}</h1>
      <p>
        Te damos la bienvenida al catálogo de productos y servicios de Yachay.pe.<br />
        Aquí podrás adquirir y gestionar tus productos con total seguridad.<br />
        Ingresa a nuestra sección catálogo y <strong>empieza a crecer</strong>.
      </p>
      <Products />
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(Home);
