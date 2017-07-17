import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styles from './styles.css';

function TableSearch(props) {
  return (
    <form name="form" className={styles.container}>
      <input type="text" className={styles.input} placeholder={props.strings.others.search} />
      <button type="submit" className={styles.searchButton}>
        <i className="linearicon-magnifier" />
      </button>
    </form>
  );
}

TableSearch.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(TableSearch);
