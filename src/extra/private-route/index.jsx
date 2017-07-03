import React from 'react';
import PropTypes from 'prop-types';

import {
  Redirect,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from '../../modules/dashboard/view';

function PrivateRoute(props) {
  return (
    <Route
      {...props.routeProps}
      render={() => (
        (props.auth.token !== '') ? (
          <Dashboard>{props.children}</Dashboard>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      )}
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.string.isRequired,
  routeProps: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }),
};

PrivateRoute.defaultProps = {
  routeProps: {
    exact: false,
    path: '/inicio',
  },
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.get('auth'),
    location: ownProps.path,
    routeProps: {
      exact: ownProps.exact,
      path: ownProps.path,
    },
  };
}

export default connect(mapStateToProps)(PrivateRoute);
