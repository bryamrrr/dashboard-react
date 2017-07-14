import store from '../../reducers/store';

const { strings } = store.getState().get('translate');
console.log(strings);

export default [
  {
    title: strings.menu.catalog.title,
    icon: 'linearicon-briefcase',
    items: [
      {
        title: strings.menu.catalog.domains,
        url: '/catalogo/dominios',
        route: {
          module: strings.menu.catalog.title,
          view: strings.menu.catalog.domains,
          method: '',
        },
      },
      {
        title: strings.menu.catalog.hosting,
        url: '/catalogo/hosting',
        route: {
          module: strings.menu.catalog.title,
          view: strings.menu.catalog.hosting,
          method: '',
        },
      },
      {
        title: strings.menu.catalog.mails,
        url: '/catalogo/correos',
        route: {
          module: strings.menu.catalog.title,
          view: strings.menu.catalog.mails,
          method: '',
        },
      },
    ],
  },
  {
    title: strings.menu.services.title,
    icon: 'linearicon-rocket',
    items: [
      {
        title: strings.menu.services.domains,
        url: '/servicios/dominios',
        route: {
          module: strings.menu.services.title,
          view: strings.menu.services.domains,
          method: '',
        },
      },
      {
        title: strings.menu.services.hosting,
        url: '/servicios/hosting',
        route: {
          module: strings.menu.services.title,
          view: strings.menu.services.hosting,
          method: '',
        },
      },
      {
        title: strings.menu.services.mails,
        url: '/servicios/correos',
        route: {
          module: strings.menu.services.title,
          view: strings.menu.services.mails,
          method: '',
        },
      },
    ],
  },
  {
    title: strings.menu.data.title,
    icon: 'linearicon-user',
    items: [
      {
        title: strings.menu.data.user,
        url: '/usuario/datos',
        route: {
          module: strings.menu.data.title,
          view: strings.menu.data.user,
          method: '',
        },
      },
      {
        title: strings.menu.data.password,
        url: '/usuario/cambio-contraseña',
        route: {
          module: strings.menu.data.title,
          view: strings.menu.data.password,
          method: '',
        },
      },
      {
        title: strings.menu.data.contacts,
        url: '/usuario/contactos',
        route: {
          module: strings.menu.data.title,
          view: strings.menu.data.contacts,
          method: '',
        },
      },
      {
        title: strings.menu.data.addresses,
        url: '/usuario/direcciones',
        route: {
          module: strings.menu.data.title,
          view: strings.menu.data.addresses,
          method: '',
        },
      },
      {
        title: strings.menu.data.purchases,
        url: '/usuario/compras',
        route: {
          module: strings.menu.data.title,
          view: strings.menu.data.purchases,
          method: '',
        },
      },
      {
        title: strings.menu.data.bills,
        url: '/usuario/comprobantes',
        route: {
          module: strings.menu.data.title,
          view: strings.menu.data.bills,
          method: '',
        },
      },
    ],
  },
];
