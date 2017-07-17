import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MenuItem from '../menu-item';

import styles from './styles.css';

function MenuAside(props) {
  const routes = [
    {
      title: props.strings.menu.catalog.title,
      icon: 'linearicon-briefcase',
      items: [
        {
          title: props.strings.menu.catalog.domains,
          url: '/catalogo/dominios',
          route: {
            module: 'catalog',
            view: 'domains',
            method: '',
          },
        },
        {
          title: props.strings.menu.catalog.hosting,
          url: '/catalogo/hosting',
          route: {
            module: 'catalog',
            view: 'hosting',
            method: '',
          },
        },
        {
          title: props.strings.menu.catalog.mails,
          url: '/catalogo/correos',
          route: {
            module: 'catalog',
            view: 'mails',
            method: '',
          },
        },
      ],
    },
    {
      title: props.strings.menu.services.title,
      icon: 'linearicon-rocket',
      items: [
        {
          title: props.strings.menu.services.domains,
          url: '/servicios/dominios',
          route: {
            module: 'services',
            view: 'domains',
            method: '',
          },
        },
        {
          title: props.strings.menu.services.hosting,
          url: '/servicios/hosting',
          route: {
            module: 'services',
            view: 'hosting',
            method: '',
          },
        },
        {
          title: props.strings.menu.services.mails,
          url: '/servicios/correos',
          route: {
            module: 'services',
            view: 'mails',
            method: '',
          },
        },
      ],
    },
    {
      title: props.strings.menu.data.title,
      icon: 'linearicon-user',
      items: [
        {
          title: props.strings.menu.data.user,
          url: '/usuario/datos',
          route: {
            module: 'data',
            view: 'user',
            method: '',
          },
        },
        {
          title: props.strings.menu.data.password,
          url: '/usuario/cambio-contraseña',
          route: {
            module: 'data',
            view: 'password',
            method: '',
          },
        },
        {
          title: props.strings.menu.data.contacts,
          url: '/usuario/contactos',
          route: {
            module: 'data',
            view: 'contacts',
            method: '',
          },
        },
        {
          title: props.strings.menu.data.addresses,
          url: '/usuario/direcciones',
          route: {
            module: 'data',
            view: 'addresses',
            method: '',
          },
        },
        {
          title: props.strings.menu.data.purchases,
          url: '/usuario/compras',
          route: {
            module: 'data',
            view: 'purchases',
            method: '',
          },
        },
        {
          title: props.strings.menu.data.bills,
          url: '/usuario/comprobantes',
          route: {
            module: 'data',
            view: 'bills',
            method: '',
          },
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {routes
          .map(menu => (
            <MenuItem
              key={menu.title}
              title={menu.title}
              icon={menu.icon}
              items={menu.items}
            />
          ))
        }
      </div>
    </div>
  );
}

MenuAside.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(MenuAside);
