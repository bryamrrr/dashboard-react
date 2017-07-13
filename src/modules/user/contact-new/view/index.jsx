import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import NewContactForm from '../new-contact-form';
import Hexagon from '../../../../components/hexagon';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class UserContactNew extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis datos' }, { title: 'Contactos' }, { title: 'Nuevo' });
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <Hexagon color="orange">
            <i className="linearicon-user" />
          </Hexagon>
          <h2>Nuevo contacto</h2>
        </div>
        <NewContactForm />
      </div>
    );
  }
}

UserContactNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(UserContactNew);
