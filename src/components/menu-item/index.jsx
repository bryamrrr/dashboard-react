import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import styles from './styles.css';

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      current: {},
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    const pathname = window.location.pathname;
    const found = this.props.items.find(item => item.url === pathname);

    if (found) {
      this.setState({
        open: true,
        current: found,
      });
    }
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const className = (this.state.open)
      ? `${styles.container} ${styles.isOpen}`
      : styles.container;

    return (
      <div className={className}>
        <div className={styles.bar} />
        <div
          className={styles.title}
          onClick={this.onClick}
          aria-hidden
        >
          <i className={this.props.icon} />
          <h4>{this.props.title}</h4>
          <i className={`linearicon-chevron-right ${styles.arrow}`} />
        </div>
        <ul className={styles.items}>
          {this.props.items
            .map((item) => {
              const active = (item.url === this.state.current.url)
                ? styles.active
                : '';

              return (
                <li
                  key={item.title}
                  className={active}
                >
                  <Link to={item.url}>
                    {item.title}
                  </Link>
                </li>
              );
            },
          )}
        </ul>
      </div>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuItem;
