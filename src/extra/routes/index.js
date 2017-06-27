export default [
  {
    title: 'Catálogo',
    icon: 'linearicon-briefcase',
    items: [
      {
        title: 'Dominios',
        url: '/catalogo/dominios',
        route: {
          module: 'Catálogo',
          view: 'Dominios',
          method: '',
        },
      },
      {
        title: 'Hosting',
        url: '/catalogo/hosting',
        route: {
          module: 'Catálogo',
          view: 'Hosting',
          method: '',
        },
      },
      {
        title: 'Correos',
        url: '/catalogo/correos',
        route: {
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
        route: {
          module: 'Mis servicios',
          view: 'Dominios',
          method: '',
        },
      },
      {
        title: 'Hosting',
        url: '/servicios/hosting',
        route: {
          module: 'Mis servicios',
          view: 'Hosting',
          method: '',
        },
      },
      {
        title: 'Correos',
        url: '/servicios/correos',
        route: {
          module: 'Mis servicios',
          view: 'Correos',
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
        route: {
          module: 'Mis datos',
          view: 'Datos',
          method: '',
        },
      },
      {
        title: 'Cambiar contraseña',
        url: '/usuario/cambio-contraseña',
        route: {
          module: 'Mis datos',
          view: 'Cambiar contraseña',
          method: '',
        },
      },
      {
        title: 'Contactos',
        url: '/usuario/contactos',
        route: {
          module: 'Mis datos',
          view: 'Contactos',
          method: '',
        },
      },
      {
        title: 'Mis pagos',
        url: '/usuario/pagos',
        route: {
          module: 'Mis datos',
          view: 'Mis pagos',
          method: '',
        },
      },
      {
        title: 'Pendientes de renovación',
        url: '/usuario/pendientes-renovacion',
        route: {
          module: 'Mis datos',
          view: 'Pendientes de renovación',
          method: '',
        },
      },
    ],
  },
];
