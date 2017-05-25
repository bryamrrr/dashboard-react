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
      barStyles: { background: props.lineColor },
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
          <i className={`${styles.icon} ${this.props.includeIcon}`} />
        }
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            id={this.props.name}
            value={this.state.balue}
            onChange={event => this.onInputChange(event.target.value)}
            type="text"
          />
          <div
            className={styles.bar}
            style={this.state.barStyles}
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
  placeholder: PropTypes.string,
  lineColor: PropTypes.string,
  includeIcon: PropTypes.string,
};

TextInput.defaultProps = {
  lineColor: '#2391e6',
  placeholder: '',
  includeIcon: '',
};

export default TextInput;
