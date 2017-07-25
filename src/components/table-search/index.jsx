import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styles from './styles.css';

class TableSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { term: this.props.term };
  }

  onChange(term) {
    this.setState({ term });
  }

  render() {
    return (
      <form
        name="form"
        className={styles.container}
        onSubmit={() => this.props.onSearch(this.state.term)}
      >
        <input
          type="text"
          className={styles.input}
          placeholder={this.props.strings.others.search}
          onChange={event => this.onChange(event.target.value)}
          value={this.state.term}
        />
        <button
          type="submit"
          className={styles.searchButton}
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
  term: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(TableSearch);
