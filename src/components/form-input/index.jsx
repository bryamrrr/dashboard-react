import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class TextInput extends Component {
  constructor(props) {
    super(props);

    const value = (this.props.field !== {})
      ? (this.props.field.input.value)
      : '';

    this.state = { value };
  }

  onInputChange(value) {
    this.setState({ value });
  }

  render() {
    const { includeIcon } = this.props;
    const { input, meta } = this.props.field;

    const className = `${styles.container} \
      ${includeIcon !== '' ? styles.hasIcon : ''} \
      ${this.state.value !== '' ? styles.hasContent : ''} \
      ${meta.touched && meta.error ? styles.hasError : ''}`;

    return (
      <div className={className}>
        {
          includeIcon !== '' && <i className={`${styles.icon} ${includeIcon}`} />
        }
        <div className={styles.inputContainer}>
          <input
            {...input}
            className={styles.input}
            id={this.props.name}
            value={this.state.value}
            onChange={(event) => {
              if (this.props.field !== {}) input.onChange();
              this.onInputChange(event.target.value);
            }}
            type={this.props.type}
          />
          <div
            className={styles.bar}
          />
          <label
            htmlFor={this.props.name}
            className={styles.label}
          >
            {this.props.placeholder}
          </label>
          {meta.touched && (
            <span className={styles.errorText}>{meta.error}</span>
          )}
        </div>
      </div>
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.shape({
    input: PropTypes.object,
    meta: PropTypes.object,
  }),
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
  ]).isRequired,
  placeholder: PropTypes.string,
  includeIcon: PropTypes.string,
};

TextInput.defaultProps = {
  field: {
    input: {},
    meta: {},
  },
  type: 'text',
  placeholder: '',
  includeIcon: '',
};

export default TextInput;
