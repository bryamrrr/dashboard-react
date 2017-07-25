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
    const { includeIcon, disabled } = this.props;
    const { input, meta } = this.props.field;

    let className = `${styles.container} \
      ${includeIcon !== '' ? styles.hasIcon : ''} \
      ${this.state.value !== '' ? styles.hasContent : ''} \
      ${meta.touched && meta.error ? styles.hasError : ''}`;

    className += (includeIcon !== '') ? ` ${styles.iconPadding}` : '';
    className += (disabled) ? ` ${styles.disabled}` : '';

    return (
      <div className={className}>
        {
          includeIcon !== '' && <i className={`${styles.icon} ${includeIcon}`} />
        }
        <input
          {...input}
          className={styles.input}
          id={this.props.name}
          value={this.state.value}
          onChange={(event) => {
            if (this.props.field !== {}) {
              input.onChange(event);
              // console.log(event.target.value);
            }
            this.onInputChange(event.target.value);
          }}
          type={this.props.type}
          disabled={disabled}
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
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  field: {
    input: {},
    meta: {},
  },
  type: 'text',
  placeholder: '',
  includeIcon: '',
  disabled: false,
};

export default TextInput;
