import React from 'react';
import PropTypes from 'prop-types';

function DomainsTable(props) {
  console.log(props.prices);
  return (
    <table>
      <tbody>
        {props.domains.map(domain =>
          <tr key={domain.id}>
            <td>{domain.name}</td>
          </tr>,
        )}
      </tbody>
    </table>
  );
}

DomainsTable.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DomainsTable;
