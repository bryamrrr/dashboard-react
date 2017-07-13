import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

function ButtonIcon(props) {
  return (
    <div
      className={styles.container}
      onClick={() => props.onClick()}
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
};

ButtonIcon.defaultProps = {
  tooltip: '',
  url: '',
  onClick: null,
};

export default ButtonIcon;
