export default [
  {
    title: 'Catálogo',
    icon: 'linearicon-briefcase',
    items: [
      {
        title: 'Dominios',
        url: '/catalogo/dominios',
        state: {
          module: 'Catálogo',
          view: 'Dominios',
          method: '',
        },
      },
      {
        title: 'Hosting',
        url: '/catalogo/hosting',
        state: {
          module: 'Catálogo',
          view: 'Hosting',
          method: '',
        },
      },
      {
        title: 'Correos',
        url: '/catalogo/correos',
        state: {
          module: 'Catálogo',
          view: 'Correos',
          method: '',
        },
      },
    ],
  },
  {
    title: 'Mis servicios',
    icon: 'linearicon-rocket',
    items: [
      {
        title: 'Dominios',
        url: '/servicios/dominios',
        state: {
          module: 'Servicios',
          view: 'Dominios',
          method: '',
        },
      },
      {
        title: 'Hosting',
        url: '/servicios/hosting',
        state: {
          module: 'Servicios',
          view: 'Hosting',
          method: '',
        },
      },
      {
        title: 'Correos',
        url: '/servicios/correos',
        state: {
          module: 'Servicios',
          view: 'Hosting',
          method: '',
        },
      },
    ],
  },
  {
    title: 'Mis datos',
    icon: 'linearicon-user',
    items: [
      {
        title: 'Datos personales',
        url: '/usuario/datos',
        state: {
          module: 'Usuario',
          view: 'Datos',
          method: '',
        },
      },
      {
        title: 'Cambiar contraseña',
        url: '/usuario/cambio-contraseña',
        state: {
          module: 'Usuario',
          view: 'Cambiar contraseña',
          method: '',
        },
      },
      {
        title: 'Mis pagos',
        url: '/usuario/pagos',
        state: {
          module: 'Usuario',
          view: 'Mis pagos',
          method: '',
        },
      },
      {
        title: 'Pendientes de renovación',
        url: '/usuario/pendientes-renovacion',
        state: {
          module: 'Usuario',
          view: 'Pendientes de renovación',
          method: '',
        },
      },
    ],
  },
];
