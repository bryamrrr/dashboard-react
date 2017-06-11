import React, { Component } from 'react';

import { connect } from 'react-redux';

import Combo from '../combo';

class DomainSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }

  onInputChange(name) {
    this.setState({ name });
  }

  render() {
    const options = {
      1: {
        id: 1,
        name: 'pe',
      },
      2: {
        id: 2,
        name: 'com',
      },
      3: {
        id: 3,
        name: 'net',
      },
    };

    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={event => this.onInputChange(event.target.value)}
        />
        <Combo
          options={options}
        />
        <button>Buscar</button>
      </div>
    );
  }
}

function mapStateToProps({ catalog }) {
  return { zones: catalog.zones };
}

export default connect(mapStateToProps)(DomainSearch);
