import React from 'react';

import Table from '../../../../components/table';

function DomainsService() {
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

export default DomainsService;
