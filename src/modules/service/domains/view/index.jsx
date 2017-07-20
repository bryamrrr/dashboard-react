import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DomainsTable from '../domains-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';
import Anchor from '../../../../components/anchor';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class DomainService extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'domains' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="orange">
              <i className="linearicon-earth" />
            </Hexagon>
            <h2>{this.props.strings.domainsService.title}</h2>
          </div>
          <p>{this.props.strings.domainsService.description}</p>
        </div>
        <DomainsTable />
        <div className={styles.footer}>
          <Link to="/servicios/dominios/dnssubordinados" className={styles.iconContainer}>
            <Anchor text="Administrar DNS Subornidados" />
          </Link>
          <TablePagination />
        </div>
      </div>
    );
  }
}

DomainService.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(DomainService);
