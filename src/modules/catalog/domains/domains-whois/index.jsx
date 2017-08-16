import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form/immutable';

import FormInput from '../../../../components/form-input';
import FormButton from '../../../../components/form-button';

import httpRequest from '../../../../extra/http-request';
import constants from '../../../../extra/constants';

import regex from '../../../../regex';

import styles from './styles.css';

function renderDomain(field) {
  return (
    <FormInput
      field={field}
      name="domain"
      type="text"
      placeholder="Ingrese el dominio"
      includeIcon="linearicon-earth"
    />
  );
}

class DomainsWhois extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(domain) {
    this.setState({ domain });
  }

  async onSubmit(values) {
    this.setState({ loading: true });
    const url = `${constants.urls.API_SONQO}/domains/whois/${values.get('domain')}`;
    const { data } = await httpRequest('GET', url);
    this.setState({
      loading: false,
      data,
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <form
          className={styles.searchContent}
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="domain"
            component={renderDomain}
          />
          <FormButton
            callToAction="Buscar"
            type="submit"
            loading={this.state.loading}
          />
        </form>
        <div className={styles.infoContent}>
          { !_.isEmpty(this.state.data) &&
          <div>
            <h3>{this.state.data.domain}</h3>
            <ul className={styles.responseList}>
              <li>
                <span className={styles.listHeader}>Estado del dominio:</span>
                <span>{this.state.data.status}</span>
              </li>
              <li>
                <span className={styles.listHeader}>Nombre del titular:</span>
                <span>{this.state.data.owner}</span>
              </li>
              <li>
                <span className={styles.listHeader}>Contacto Administrativo:</span>
                <span>{this.state.data.adminEmail}</span>
              </li>
              <li>
                <span className={styles.listHeader}>Empresa comercializadora:</span>
                <span>{this.state.data.registrar}</span>
              </li>
              <li>
                <span className={styles.listHeader}>Registros DNS activos:</span>
                <div className={styles.dnsList}>
                  {this.state.data.dns.map((item, $index) =>
                    <span key={$index}>{item}</span>,
                  )}
                </div>
              </li>
            </ul>
          </div>
          }
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.get('domain')) {
    errors.domain = 'Ingresa el dominio';
  } else if (!regex.validate.domain.test(values.get('domain'))) {
    errors.domain = regex.message.domain;
  }

  return errors;
}

DomainsWhois.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const DomainsWhoisRedux = reduxForm({
  validate,
  form: 'WhoisDomain',
})(DomainsWhois);

export default DomainsWhoisRedux;
