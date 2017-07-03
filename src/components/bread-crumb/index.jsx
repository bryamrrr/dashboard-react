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
        {(props.routes.module.title &&
          <li className={styles.item}>
            <span>/</span>
            {props.routes.module.title}
          </li>
        )}
        {(props.routes.view.title &&
          <li className={styles.item}>
            <span>/</span>
            {props.routes.view.title}
          </li>
        )}
        {(props.routes.method.title &&
          <li className={styles.item}>
            <span>/</span>
            {props.routes.method.title}
          </li>
        )}
      </ol>
    </div>
  );
}

function mapStateToProps(state) {
  return { routes: state.get('routes') };
}

BreadCrumb.propTypes = {
  routes: PropTypes.shape({
    module: PropTypes.object.isRequired,
    view: PropTypes.object.isRequired,
    method: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(BreadCrumb);
