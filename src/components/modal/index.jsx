import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from '../../reducers/store';

import styles from './styles.css';

class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');

    document.body.appendChild(this.modalTarget);
    this.renderModal();
  }

  componentWillUpdate() {
    this.renderModal();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  renderModal() {
    ReactDOM.render(
      <Provider store={store}>
        <div
          className={styles.modalContainer}
          onClick={() => this.props.onClose()}
          aria-hidden
        >
          <div
            className={styles.modal}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-hidden
          >
            <div
              onClick={() => this.props.onClose()}
              aria-hidden
              className={styles.close}
            >
              <i className="linearicon-cross" />
            </div>
            {this.props.children}
          </div>
        </div>
      </Provider>,
      this.modalTarget,
    );
  }

  render() {
    return <noscript />;
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: null,
};

export default Modal;
