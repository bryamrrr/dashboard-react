import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MailsTable from '../mails-table';

import Hexagon from '../../../../components/hexagon';
import TablePagination from '../../../../components/table-pagination';

import { setRoute } from '../../../../reducers/routes/actions';

import styles from './styles.css';

class MailService extends Component {
  componentWillMount() {
    this.props.setRoute({ title: 'services' }, { title: 'mails' });
  }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Hexagon color="blue">
              <i className="linearicon-envelope" />
            </Hexagon>
            <h2>{this.props.strings.mailsService.title}</h2>
          </div>
          <p>{this.props.strings.mailsService.description}</p>
        </div>
        <MailsTable />
        <TablePagination />
      </div>
    );
  }
}

MailService.propTypes = {
  setRoute: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setRoute })(MailService);
