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
        title: 'Direcciones',
        url: '/usuario/direcciones',
        route: {
          module: 'Mis datos',
          view: 'Direcciones',
          method: '',
        },
      },
      {
        title: 'Mis compras',
        url: '/usuario/compras',
        route: {
          module: 'Mis datos',
          view: 'Compras',
          method: '',
        },
      },
      {
        title: 'Mis comprobantes',
        url: '/usuario/comprobantes',
        route: {
          module: 'Mis datos',
          view: 'Comprobantes',
          method: '',
        },
      },
    ],
  },
];
