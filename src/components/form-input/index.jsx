import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class TextInput extends Component {
  constructor(props) {
    super(props);

    const includeIcon = (this.props.includeIcon !== '');
    const containerClasses = (includeIcon)
     ? `${styles.container} ${styles.hasIcon}`
     : styles.container;

    this.state = {
      containerClasses,
      value: '',
    };
  }

  onInputChange(value) {
    let containerClasses = '';

    if (value !== '') {
      containerClasses = `${styles.container} ${styles.hasIcon} ${styles.hasContent}`;
    } else {
      containerClasses = `${styles.container} ${styles.hasIcon}`;
    }

    this.setState({
      containerClasses,
      value,
    });
  }

  render() {
    return (
      <div className={this.state.containerClasses}>
        { this.props.includeIcon !== '' &&
          <i
            className={`${styles.icon} ${this.props.includeIcon}`}
            style={{ color: this.props.iconColor }}
          />
        }
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            id={this.props.name}
            value={this.state.balue}
            onChange={event => this.onInputChange(event.target.value)}
            type={this.props.type}
          />
          <div
            className={styles.bar}
            style={{ backgroundColor: this.props.lineColor }}
          />
          <label
            htmlFor={this.props.name}
            className={styles.label}
          >
            {this.props.placeholder}
          </label>
        </div>
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.PropTypes.oneOf([
    'text',
    'password',
    'email',
  ]).isRequired,
  placeholder: PropTypes.string,
  lineColor: PropTypes.string,
  iconColor: PropTypes.string,
  includeIcon: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text',
  lineColor: '#2391e6',
  iconColor: '#2391e6',
  placeholder: '',
  includeIcon: '',
};

export default TextInput;
