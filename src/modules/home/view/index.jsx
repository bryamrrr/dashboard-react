import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Products from '../products';

import { setRoute } from '../../../reducers/routes/actions';

import styles from './styles.css';

class Home extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'home' });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{this.props.username}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: this.props.strings.home.description,
          }}
        />
        <Products />
      </div>
    );
  }
}

Home.propTypes = {
  username: PropTypes.string.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    username: state.get('auth').user.username,
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps, { setRoute })(Home);
