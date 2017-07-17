import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import HostingTable from '../hosting-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class HostingService extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'hosting' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="red">
              <i className="linearicon-drawer2" />
            </Hexagon>
            <h2>{this.props.strings.hostingService.title}</h2>
          </div>
          <p>{this.props.strings.hostingService.description}</p>
        </div>
        <HostingTable />
        <TablePagination />
      </div>
    );
  }
}

HostingService.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(HostingService);
