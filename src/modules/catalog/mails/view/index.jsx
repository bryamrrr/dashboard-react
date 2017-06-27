import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class MailsCatalog extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Catálogo' }, { title: 'Correos' });
  }
  render() {
    return (
      <div className={styles.container}>
        <CatalogCard />
        <CatalogCard />
        <CatalogCard />
      </div>
    );
  }
}

MailsCatalog.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps({ hosting }) {
  return { hosting };
}

export default connect(mapStateToProps, { setRoute })(MailsCatalog);
