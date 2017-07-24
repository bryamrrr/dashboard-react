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
    this.props.changeSelected(selected, this.props.trackItem);
  }

  render() {
    const { selected } = this.state;
    const { includeIcon, config } = this.props;


    const options = (selected.period)
      ? _.filter(this.state.options, option => option.id !== selected.period)
      : _.filter(this.state.options, option => option.id !== selected.id);

    const text = (selected[config.label])
      ? selected[config.label]
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
              key={item[config.key]}
              data-id={item[config.value]}
            >
              {item[config.label]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Combo.propTypes = {
  changeSelected: PropTypes.func.isRequired,
  config: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  includeIcon: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  placeholder: PropTypes.string,
  selected: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ])),
  trackItem: PropTypes.string,
};

Combo.defaultProps = {
  config: {
    key: 'id',
    value: 'id',
    label: 'name',
  },
  includeIcon: '',
  placeholder: 'Selecciona una opción',
  selected: {},
  trackItem: null,
};

export default Combo;
