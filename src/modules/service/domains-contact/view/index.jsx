import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';

import { setRoute } from '../../../../reducers/routes/actions';

import ContactForm from '../contact-form';

import styles from './styles.css';

class DomainContactList extends Component {

  componentWillMount() {
    this.props.setRoute({ title: 'Mis servicios' }, { title: 'Dominios' }, { title: 'Contactos' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="orange">
              <i className="linearicon-users2" />
            </Hexagon>
            <h2>qiqmapunku.pe</h2>
          </div>
        </div>
        <ContactForm />
      </div>
    );
  }
}

DomainContactList.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainContactList);
