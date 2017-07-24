import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styles from './styles.css';

class TableSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onChange(term) {
    this.setState({ term });
  }

  render() {
    return (
      <form name="form" className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder={this.props.strings.others.search}
          onChange={event => this.onChange(event.target.value)}
        />
        <button
          type="submit"
          className={styles.searchButton}
          onClick={() => this.props.onSearch(this.state.term)}
        >
          <i className="linearicon-magnifier" />
        </button>
      </form>
    );
  }
}

TableSearch.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(TableSearch);
