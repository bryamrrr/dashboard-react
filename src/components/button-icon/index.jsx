import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

function ButtonIcon(props) {
  return (
    <div
      className={styles.container}
      onClick={() => props.onClick(props.meta)}
      aria-hidden
    >
      <div className={styles.button}>
        {(props.url !== '' &&
          <Link to={props.url} className={styles.iconContainer}>
            <i className={props.icon} />
          </Link>
        )}
        {(props.url === '' &&
          <div className={styles.iconContainer}>
            <i className={props.icon} />
          </div>
        )}
      </div>
      {(props.tooltip !== '' &&
        <div className={styles.tooltip}>{props.tooltip}</div>
      )}
    </div>
  );
}

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  meta: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])),
};

ButtonIcon.defaultProps = {
  tooltip: '',
  url: '',
  onClick: null,
  meta: {},
};

export default ButtonIcon;
