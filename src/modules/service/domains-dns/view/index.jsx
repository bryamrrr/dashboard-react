import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Hexagon from '../../../../components/hexagon';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainDnsList extends Component {

  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' }, { title: 'dns' });
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
      </div>
    );
  }
}

DomainDnsList.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainDnsList);
