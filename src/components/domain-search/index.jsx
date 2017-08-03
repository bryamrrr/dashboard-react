import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../extra/http-request';
import ComboSearch from '../combo-search';
import LoadingSpin from '../loading-spin';

import constants from '../../extra/constants';

import styles from './styles.css';

class DomainSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
      selected: {},
      zones: {},
    };

    this.changeSelected = this.changeSelected.bind(this);
    this.search = this.search.bind(this);
  }

  async componentWillMount() {
    const url = `${constants.urls.API_SONQO}/dnszones`;
    const { data: { results } } = await httpRequest('GET', url);
    this.setState({
      zones: results,
      selected: results[1],
    });
  }

  onInputChange(name) {
    this.setState({ name });
  }

  changeSelected(newSelected) {
    this.setState({ selected: newSelected });
  }

  async search() {
    const { name, selected } = this.state;
    const domain = `${name}.${selected.name}`;
    this.setState({ loading: true });

    const url = `${constants.urls.API_SONQO}/domains/search?name=${domain}`;
    const { data: { results } } = await httpRequest('GET', url);

    this.props.getDomains(results);
    this.setState({ loading: false });
  }

  render() {
    const className = (this.state.loading)
    ? `${styles.button} ${styles.isLoading}`
    : styles.button;

    return (
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <i className={`linearicon-magnifier ${styles.searchIcon}`} />
          <input
            type="text"
            placeholder={this.props.strings.domainsCatalog.searchDomain}
            value={this.state.name}
            onChange={event => this.onInputChange(event.target.value)}
            className={styles.input}
          />
        </div>
        <ComboSearch
          options={_.mapKeys(this.state.zones, 'id')}
          changeSelected={this.changeSelected}
          selected={this.state.selected}
          placeholder="Selecciona una opción"
        />
        <button
          onClick={this.search}
          className={className}
          disabled={this.state.loading}
        >
          <span>{this.props.strings.others.search}</span>
          { this.state.loading && <LoadingSpin size={23} /> }
        </button>
      </div>
    );
  }
}

DomainSearch.propTypes = {
  getDomains: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    zones: state.get('zones'),
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps)(DomainSearch);
