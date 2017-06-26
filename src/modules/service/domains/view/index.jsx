import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { setRoute } from '../../../../reducers/routes/actions';

import Table from '../../../../components/table';

class DomainsService extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'Mis Servicios' }, { title: 'Dominios' });
  }

  render() {
    return (
      <div>
        <h1>Dominios</h1>
        <p>Un dominio es el nombre que identifica tu sitio web en internet</p>
        <Table
          headers={['Dominio', 'Estado', 'Fecha de registro']}
          slugs={['name', 'status', 'created']}
          data={[
            {
              id: '123asfasdasd-123fadasd',
              name: 'hola.pe',
              status: 'Activo',
              created: '17 ENE',
            },
            {
              id: '124asfasdasd-123fadasd',
              name: 'test.pe',
              status: 'Pendiente',
              created: '23 JUN',
            },
          ]}
          buttons={[
            {
              text: 'Ver',
              icon: 'linearicon-eye',
              callback: a => console.log(`Llegó el valor ${a} al primer callback`),
            },
            {
              text: 'Cambiar',
              icon: 'linearicon-user',
              callback: a => console.log(`Llegó el valor ${a} al segundo callback`),
            },
          ]}
        />
      </div>
    );
  }
}

DomainsService.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default connect(null, { setRoute })(DomainsService);
