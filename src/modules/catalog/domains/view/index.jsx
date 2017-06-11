import React, { Component } from 'react';

import { connect } from 'react-redux';

import DomainSearch from '../../../../components/domain-search';
import Info from '../../../../components/info';
import DomainsTable from '../domains-table';

class DomainsCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      domains: null,
    };
  }

  render() {
    return (
      <div>
        <DomainSearch
          zones={this.state.zones}
        />
        {(this.state.search &&
          <Info
            icon="linearicon-user"
            text="Hola mundo"
          /> &&
          <DomainsTable
            domains={{}}
          />
        )}
      </div>
    );
  }
  // async initialFetch() {
  //   if (this.props.user && this.props.comments.size > 0)
  //     return this.setState({ loading: false });

  //   await Promise.all([
  //     this.props.actions.loadUser(this.props.userId),
  //     this.props.actions.loadCommentsForPost(this.props.id),
  //   ]);

  //   return this.setState({ loading: false });
  // }
}

function mapStateToProps({ catalog }) {
  return { zones: catalog.zones };
}

export default connect(mapStateToProps)(DomainsCatalog);
