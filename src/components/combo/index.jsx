import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import styles from './styles.css';

class Combo extends Component {
  constructor(props) {
    super(props);

    const {
      options,
      placeholder,
      selected,
    } = this.props;

    this.state = {
      options,
      open: false,
      placeholder,
      selected,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.select = this.select.bind(this);
  }

  onBlur() {
    this.setState({ open: false });
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  select(event) {
    const id = event.target.getAttribute('data-id');
    const selected = this.state.options[id];

    this.setState({ selected });
    this.props.changeSelected(selected);
  }

  render() {
    const { options, selected } = this.state;
    const { includeIcon } = this.props;

    const text = (selected.name)
      ? selected.name
      : '';

    let className = (this.state.open)
      ? `${styles.container} ${styles.isOpen}`
      : styles.container;

    className += (includeIcon !== '') ? ` ${styles.icon}` : '';

    const classLabel = (text !== '')
      ? `${styles.label} ${styles.isSelected}`
      : styles.label;

    return (
      <div
        className={className}
        tabIndex="0"
        onClick={this.onClick}
        onBlur={this.onBlur}
        aria-hidden
      >
        <div className={styles.selected}>
          {
            includeIcon !== '' && <i className={`${styles.comboIcon} ${includeIcon}`} />
          }
          <span className={classLabel}>{this.props.placeholder}</span>
          {
            text !== '' && <span>{text}</span>
          }
          <i className={`linearicon-chevron-down ${styles.arrow}`} />
        </div>
        <ul
          className={styles.list}
          onClick={this.select}
          aria-hidden
        >
          {_.map(options, item => (
            <li
              key={item.id}
              data-id={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Combo.propTypes = {
  changeSelected: PropTypes.func.isRequired,
  includeIcon: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string,
  selected: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

Combo.defaultProps = {
  includeIcon: '',
  placeholder: 'Selecciona una opción',
  selected: {},
};

export default Combo;
