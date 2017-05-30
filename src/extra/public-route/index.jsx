import React from 'react';
import PropTypes from 'prop-types';

import {
  Redirect,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

function PublicRoute(props) {
  return (
    <Route
      {...props.routeProps}
      render={() => (
        (props.auth.token === '')
          ? <div>{props.children}</div>
          : <Redirect to={{ pathname: '/inicio' }} />
      )}
    />
  );
}

PublicRoute.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
  routeProps: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }),
};

PublicRoute.defaultProps = {
  routeProps: {
    exact: false,
    path: '/inicio',
  },
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    location: ownProps.path,
    routeProps: {
      exact: ownProps.exact,
      path: ownProps.path,
    },
  };
}

export default connect(mapStateToProps)(PublicRoute);
