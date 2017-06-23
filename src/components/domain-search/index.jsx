import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import httpRequest from '../../extra/http-request';
import ComboSearch from '../combo-search';

import styles from './styles.css';

class DomainSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      selected: {},
    };

    this.changeSelected = this.changeSelected.bind(this);
    this.search = this.search.bind(this);
  }

  onInputChange(name) {
    this.setState({ name });
  }

  changeSelected(newSelected) {
    this.setState({ selected: newSelected });
  }

  async search() {
    // const { name, selected } = this.state;
    // const domain = `${name}.${selected.name}`;

    const url = 'http://staging-backoffice.rcp.pe:8100/dashboard/api/v1/domains/search';
    const { data: { results } } = await httpRequest('GET', url);

    this.props.getDomains(results);
  }

  render() {
    const options = {
      1: {
        id: '1',
        name: '.com.pe',
      },
      2: {
        id: '2',
        name: '.org.pe',
      },
      3: {
        id: '3',
        name: '.net.pe',
      },
      4: {
        id: '4',
        name: '.net.pe',
      },
      5: {
        id: '5',
        name: '.nom.pe',
      },
      6: {
        id: '6',
        name: '.pe',
      },
      7: {
        id: '7',
        name: '.com',
      },
      8: {
        id: '8',
        name: '.net',
      },
      9: {
        id: '9',
        name: '.org',
      },
      10: {
        id: '10',
        name: '.biz',
      },
      11: {
        id: '11',
        name: '.me',
      },
      12: {
        id: '12',
        name: '.tel',
      },
      13: {
        id: '13',
        name: '.in',
      },
    };

    return (
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <i className={`linearicon-magnifier ${styles.searchIcon}`} />
          <input
            type="text"
            placeholder="Busca tu dominio"
            value={this.state.name}
            onChange={event => this.onInputChange(event.target.value)}
            className={styles.input}
          />
        </div>
        <ComboSearch
          options={options}
          changeSelected={this.changeSelected}
          selected={options['1']}
        />
        <button
          onClick={this.search}
          className={styles.button}
        >
          Buscar
        </button>
      </div>
    );
  }
}

DomainSearch.propTypes = {
  getDomains: PropTypes.func.isRequired,
};

function mapStateToProps({ catalog }) {
  return { zones: catalog.zones };
}

export default connect(mapStateToProps)(DomainSearch);
