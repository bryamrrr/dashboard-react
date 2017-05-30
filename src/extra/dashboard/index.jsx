import React from 'react';
import PropTypes from 'prop-types';

import MenuAside from '../../components/menu-aside';
import Header from '../../components/header';

function Dashboard(props) {
  return (
    <div>
      <MenuAside />
      <Header />
      {props.children}
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Dashboard;
