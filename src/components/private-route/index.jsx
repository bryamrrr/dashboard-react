import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Redirect,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { component: ViewComponent } = this.props;
    console.log(this.props);
    return () => (
      <Route
        {...this.props}
        render={props => (
          (this.props.auth.token !== '') ? (
            <ViewComponent {...props} />
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
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(PrivateRoute);
