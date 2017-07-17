import React from 'react';
import PropTypes from 'prop-types';

import {
  Redirect,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import PublicHeader from '../../components/public-header';
import PublicFooter from '../../components/public-footer';

import Toaster from '../../components/toaster';

function PublicRoute(props) {
  return (
    <Route
      {...props.routeProps}
      render={() => (
        (props.auth.token === '')
          ? (<div>
            {props.items.valueSeq().map(item =>
              <Toaster key={item.id} type={item.type} message={item.message} />,
            )}
            <PublicHeader />
            {props.children}
            <PublicFooter />
          </div>)
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
  items: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

PublicRoute.defaultProps = {
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
    items: state.get('toaster'),
  };
}

export default connect(mapStateToProps)(PublicRoute);
