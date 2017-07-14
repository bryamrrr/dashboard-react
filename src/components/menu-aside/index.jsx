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
            module: props.strings.menu.catalog.title,
            view: props.strings.menu.catalog.domains,
            method: '',
          },
        },
        {
          title: props.strings.menu.catalog.hosting,
          url: '/catalogo/hosting',
          route: {
            module: props.strings.menu.catalog.title,
            view: props.strings.menu.catalog.hosting,
            method: '',
          },
        },
        {
          title: props.strings.menu.catalog.mails,
          url: '/catalogo/correos',
          route: {
            module: props.strings.menu.catalog.title,
            view: props.strings.menu.catalog.mails,
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
            module: props.strings.menu.services.title,
            view: props.strings.menu.services.domains,
            method: '',
          },
        },
        {
          title: props.strings.menu.services.hosting,
          url: '/servicios/hosting',
          route: {
            module: props.strings.menu.services.title,
            view: props.strings.menu.services.hosting,
            method: '',
          },
        },
        {
          title: props.strings.menu.services.mails,
          url: '/servicios/correos',
          route: {
            module: props.strings.menu.services.title,
            view: props.strings.menu.services.mails,
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
            module: props.strings.menu.data.title,
            view: props.strings.menu.data.user,
            method: '',
          },
        },
        {
          title: props.strings.menu.data.password,
          url: '/usuario/cambio-contraseña',
          route: {
            module: props.strings.menu.data.title,
            view: props.strings.menu.data.password,
            method: '',
          },
        },
        {
          title: props.strings.menu.data.contacts,
          url: '/usuario/contactos',
          route: {
            module: props.strings.menu.data.title,
            view: props.strings.menu.data.contacts,
            method: '',
          },
        },
        {
          title: props.strings.menu.data.addresses,
          url: '/usuario/direcciones',
          route: {
            module: props.strings.menu.data.title,
            view: props.strings.menu.data.addresses,
            method: '',
          },
        },
        {
          title: props.strings.menu.data.purchases,
          url: '/usuario/compras',
          route: {
            module: props.strings.menu.data.title,
            view: props.strings.menu.data.purchases,
            method: '',
          },
        },
        {
          title: props.strings.menu.data.bills,
          url: '/usuario/comprobantes',
          route: {
            module: props.strings.menu.data.title,
            view: props.strings.menu.data.bills,
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
