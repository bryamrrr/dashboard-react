import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { setRoute } from '../../../../reducers/routes/actions';

class DomainsService extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis servicios' }, { title: 'Dominios' });
  }

  render() {
    return (
      <div>
        <h1>Dominios</h1>
        <p>Un dominio es el nombre que identifica tu sitio web en internet</p>
      </div>
    );
  }
}

DomainsService.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainsService);
