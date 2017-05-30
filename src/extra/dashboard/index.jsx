import React from 'react';
import PropTypes from 'prop-types';

import MenuAside from '../../components/menu-aside';

function Dashboard(props) {
  return (
    <div>
      <MenuAside />
      {props.children}
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Dashboard;
