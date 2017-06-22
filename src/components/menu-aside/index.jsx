import React from 'react';

import MenuItem from '../menu-item';
import routes from '../../extra/routes';

import styles from './styles.css';

function MenuAside() {
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

export default MenuAside;
