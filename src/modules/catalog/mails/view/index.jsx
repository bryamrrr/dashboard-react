import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';
import { addProduct } from '../../../../reducers/cart/actions';
import {
  fetchMails,
  fetchMailPrices,
} from '../../../../reducers/mails/actions';

import styles from './styles.css';

class MailsCatalog extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);

    this.state = { fetchingMails: true };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'catalog' }, { title: 'mails' });

    if (this.props.mails.size > 0) return this.setState({ fetchingMails: false });

    await this.props.fetchMails();
    await this.props.fetchMailPrices();
    return this.setState({ fetchingMails: false });
  }

  addToCart(item) {
    this.props.addProduct(item, 'Email'); // Name 'Email' its a backend definition
  }

  render() {
    return (
      <div className={styles.container}>
        {(
          (this.state.fetchingMails && <LoadingSpin />)
          ||
          (!this.state.fetchingMails && this.props.mails.valueSeq().map(product =>
            <CatalogCard
              key={product.id}
              addToCart={this.addToCart}
              info={product}
            />,
          ))
        )}
      </div>
    );
  }
}

MailsCatalog.propTypes = {
  mails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  addProduct: PropTypes.func.isRequired,
  fetchMailPrices: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { mails: state.get('prices').get('mails') };
}

export default connect(mapStateToProps, {
  setRoute,
  addProduct,
  fetchMails,
  fetchMailPrices,
})(MailsCatalog);
