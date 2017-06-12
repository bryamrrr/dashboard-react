import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles.css';

function BreadCrumb(props) {
  return (
    <div className={styles.container}>
      <ol className={styles.list}>
        <li>
          <Link to="/inicio">
            <i className="linearicon-home6" />
          </Link>
        </li>
        {(props.state.module !== '' &&
          <li className={styles.item}>
            <span>/</span>
            {props.state.module}
          </li>
        )}
        {(props.state.view !== '' &&
          <li className={styles.item}>
            <span>/</span>
            {props.state.view}
          </li>
        )}
        {(props.state.method !== '' &&
          <li className={styles.item}>
            <span>/</span>
            {props.state.method}
          </li>
        )}
      </ol>
    </div>
  );
}

function mapStateToProps({ state }) {
  return { state };
}

BreadCrumb.propTypes = {
  state: PropTypes.shape({
    module: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(BreadCrumb);
